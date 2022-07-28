const express = require("express");

const Company = require("../models/Company");
const router = express.Router();

router.get("/", (req, res) => {
  Company.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.json({ message: err }));
});

router.post("/", (req, res) => {
  const company = new Company({
    name: req.body.name,
    questions: req.body.questions,
  });

  company
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
