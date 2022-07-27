const express = require("express");
const Superuser = require("../models/Superuser");
const router = express.Router();

router.get("/", (req, res) => {
  Superuser.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.json({ message: err }));
});

router.post("/", (req, res) => {
  const firstName = req.body.firstName.trim();
  const lastName = req.body.lastName.trim();
  const email = req.body.email.trim();
  const number = req.body.number.trim();
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
    !firstName ||
    !lastName ||
    !ValidateEmail(email) ||
    !validatePhoneNumber(number)
  ) {
    res.status(400).json({ message: "invalid input" });
  } else {
    const superuser = new Superuser({
      firstName,
      lastName,
      email,
      number,
      company,
      answers,
    });
    superuser
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.json({ message: err }));
  }
});

module.exports = router;
