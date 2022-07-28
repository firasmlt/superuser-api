const Company = require("../models/Company");

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

exports.addCompany = async (req, res, next) => {
  const company = new Company({
    name: req.body.name,
    questions: req.body.questions,
  });
  try {
    const data = await company.save();
    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.addCompany = async (req, res, next) => {
  const company = new Company({
    name: req.body.name,
    questions: req.body.questions,
  });
  try {
    const data = await company.save();
    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
