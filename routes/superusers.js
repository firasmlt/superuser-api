const express = require("express");
const Superuser = require("../models/Superuser");
const router = express.Router();

router.get("/", (req, res) => {
  Superuser.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.json({ message: err }));
});

router.post("/", (req, res) => {
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
    !req.body.firstName ||
    !req.body.lastName ||
    !ValidateEmail(req.body.email) ||
    !validatePhoneNumber(req.body.number)
  ) {
    res.status(400).json({ message: "invalid input" });
  } else {
    const superuser = new Superuser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      number: req.body.number,
      company: req.body.company,
      answers: req.body.answers,
    });

    superuser
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.json({ message: err }));
  }
});

module.exports = router;
