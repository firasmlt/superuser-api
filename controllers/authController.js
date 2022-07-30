const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Company = require("../models/companyModel");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const newCompany = await Company.create(req.body);
    const token = signToken(newCompany._id);

    res.json({
      status: "success",
      token,
      data: {
        ...newCompany._doc,
        password: undefined,
        __v: undefined,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("please provide email and password!", 400));
    }
    const company = await Company.findOne({ email }).select("+password");
    if (
      !company ||
      !(await company.correctPassword(password, company.password))
    )
      return next(new AppError("invalid credentials", 401));

    const token = signToken(company._id);

    res.json({
      status: "success",
      token,
      data: { ...company._doc, password: undefined, __v: undefined },
    });
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    // get token and check if it exists

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) return next(new AppError("Authentication Error", 401));

    // validating the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // checking if the user still exists
    const currentCompany = await Company.findById(decoded.id);
    if (!currentCompany) return next(new AppError("invalid token", 401));

    // checking if password is changed
    if (currentCompany.changedPasswordAfter(decoded.iat))
      return next(new AppError("invalid token", 401));

    // grant access
    req.company = currentCompany;
    next();
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    // get user based on posted email
    const user = await Company.findOne({ email: req.body.email });
    if (!user)
      return next(
        new AppError("no user with the specified email address", 404)
      );
    // generate the random token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // send it to the user's email
    const tokenURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/companies/resetPassword/${resetToken}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "testing",
        message: `reset link : \n ${tokenURL}`,
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
    }
    console.log("heeey");
    res.status(200).json({
      status: "success",
      message: "reset email sent",
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await Company.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) return next(new AppError("invalid token", 400));
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    next(err);
  }
};
