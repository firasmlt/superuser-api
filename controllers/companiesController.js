const Company = require("../models/companyModel");
const AppError = require("../utils/appError");

exports.getAllCompanies = async (req, res, next) => {
  try {
    const data = await Company.find();
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCompany = async (req, res, next) => {
  try {
    const data = await Company.findById(req.params.id);
    if (!data) return next(new AppError("no company found with that id", 404));
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
