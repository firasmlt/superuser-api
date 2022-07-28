const express = require("express");
const companiesController = require("../controllers/companiesController");
const router = express.Router();

router.get("/", companiesController.getAllCompanies);

router.post("/", companiesController.addCompany);

module.exports = router;
