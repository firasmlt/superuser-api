const express = require("express");

const companyController = require("../controllers/companyController");
const router = express.Router();

router.get("/:id", companyController.getCompany);

module.exports = router;
