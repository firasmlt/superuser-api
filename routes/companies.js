const express = require("express");
const companiesController = require("../controllers/companiesController");
const router = express.Router();

router.get("/", companiesController.getAllCompanies);

router.post("/signup", companiesController.signUp);

router.get("/:id", companiesController.getCompany);

module.exports = router;
