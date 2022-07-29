const express = require("express");

const superusersController = require("../controllers/superusersController");
// const authController = require("../controllers/authController");
const router = express.Router();

router.get("/", superusersController.getAllUsers);

router.post("/", superusersController.postUser);

router.get("/:id", superusersController.getUser);

router.patch("/:id", superusersController.updateUser);

module.exports = router;
