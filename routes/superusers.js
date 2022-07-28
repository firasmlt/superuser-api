const express = require("express");

const superusersController = require("../controllers/superusersController");
const router = express.Router();

router.get("/", superusersController.getAllUsers);

router.post("/", superusersController.postUser);

module.exports = router;
