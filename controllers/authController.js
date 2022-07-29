const jwt = require("jsonwebtoken");
const Company = require("../models/companyModel");
const AppError = require("../utils/appError");

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

    // check email password exists
    if (!email || !password) {
      return next(new AppError("please provide email and password!", 400));
    }

    // check if company exists and password correct
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
