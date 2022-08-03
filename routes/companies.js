const express = require("express");

const companiesController = require("../controllers/companiesController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .get("/", companiesController.getAllCompanies)
  .get("/:id", companiesController.getCompany)
  .patch("/update", authController.protect, companiesController.updateCompany)
  .delete("/delete", authController.protect, companiesController.deleteCompany)
  .post("/signup", authController.signUp)
  .post("/login", authController.logIn);
// .post("/forgotPassword", authController.forgotPassword)
// .patch("/resetPassword/:token", authController.resetPassword);

module.exports = router;
