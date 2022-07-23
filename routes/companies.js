const express = require("express");
const companies = [
    {
      _id: "Objectid(3w42e43d24f1)",
      name: "google",
      questions: ["question 1", "question 2"],
    },
    {
      _id: "Objectid(3eds43d24f1)",
      name: "facebook",
      questions: ["question 1", "question 2"],
    },
  ];
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json(companies);
  });

module.exports = router;
