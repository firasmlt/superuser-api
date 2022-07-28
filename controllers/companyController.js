const Company = require("../models/Company");

exports.getCompany = (req, res) => {
  Company.findById(req.params.id).then((data) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });
};
