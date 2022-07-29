const express = require("express");
const companiesController = require("../controllers/companiesController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/", authController.protect, companiesController.getAllCompanies);
router.get("/:id", companiesController.getCompany);
router.delete("/:id", companiesController.deleteCompany);
module.exports = router;
