const Superuser = require("../models/Superuser");

exports.getAllUsers = async (req, res, next) => {
  try {
    const data = await Superuser.findd();
    res.status(200).json(data);
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
  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !ValidateEmail(email.trim()) ||
    !validatePhoneNumber(number.trim())
  ) {
    res.status(400).json({ message: "invalid input" });
  } else {
    const superuser = new Superuser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      number: number.trim(),
      company,
      answers,
    });
    try {
      const data = await superuser.save();
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
};
