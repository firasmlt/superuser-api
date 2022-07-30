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

exports.deleteCompany = async (req, res, next) => {
  try {
    if (String(req.company._id) !== req.params.id)
      return next(new AppError("not authorized", 401));
    const data = await Company.findByIdAndDelete(req.params.id);
    if (!data) return next(new AppError("no company found with that id", 404));
    res.status(200).json({
      status: "success",
      message: "company deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
