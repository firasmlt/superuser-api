const Superuser = require("../models/Superuser");
const AppError = require("../utils/appError");

exports.getAllUsers = async (req, res, next) => {
  try {
    const data = await Superuser.find();
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const number = req.body.number;
  const company = req.body.company;
  const answers = req.body.answers;

  const ValidateEmail = (email) => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) return true;

    return false;
  };
  const validatePhoneNumber = (number) => {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(number);
  };
  if (!firstName || !lastName || !email || !number) {
    return next(new AppError("invalid input", 400));
  } else {
    if (!validatePhoneNumber(number) || !ValidateEmail(email))
      return next(new AppError("invalid input", 400));
    try {
      const superuser = new Superuser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        number: number.trim(),
        company,
        answers,
      });
      const data = await superuser.save();
      if (!data) return next(new AppError("no data found!", 404));
      res.json({
        status: "success",
        data,
      });
    } catch (err) {
      next(err);
    }
  }
};
