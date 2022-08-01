const express = require("express");

const superusersController = require("../controllers/superusersController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .get("/", superusersController.getAllUsers)
  .post("/", superusersController.postUser)
  .get("/:id", superusersController.getUser)
  .patch("/addAnswer/:id", superusersController.addAnswer)
  .patch("/:id", authController.protect, superusersController.updateUser)
  .delete("/:id", authController.protect, superusersController.deleteUser);

module.exports = router;
