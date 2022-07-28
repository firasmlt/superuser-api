const express = require("express");

const Company = require("../models/Company");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(400).json({ message: "bad request" });
});

router.get("/:id", (req, res) => {
  Company.findById(req.params.id).then((data) => {
    if (data) return res.status(200).json(data);
    res.status(404).json({ message: "document not found" });
  });
});

module.exports = router;
