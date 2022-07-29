const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Company = require("../models/companyModel");
const AppError = require("../utils/appError");
// const { use } = require("../routes/companies");

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

exports.signIn = async (req, res, next) => {
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
    const freshCompany = await Company.findById(decoded.id);
    if (!freshCompany) return next(new AppError("invalid token", 401));

    // checking if password is changed
    if (freshCompany.changedPasswordAfter(decoded.iat))
      return next(new AppError("invalid token", 401));

    next();
  } catch (err) {
    next(err);
  }
};
