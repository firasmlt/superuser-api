const express = require("express");
const companiesController = require("../controllers/companiesController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .post("/signup", authController.signUp)
  .post("/login", authController.logIn)
  .post("/forgotPassword", authController.forgotPassword)
  .patch("/resetPassword/:token", authController.resetPassword)
  .get("/", authController.protect, companiesController.getAllCompanies)
  .get("/:id", companiesController.getCompany)
  .delete("/:id", authController.protect, companiesController.deleteCompany);

module.exports = router;
