const express = require("express");
const router = express.Router();
const superuserController = require("../controllers/superuserController");

router.get("/:id", superuserController.getUser);

router.patch("/:id", superuserController.updateUser);

module.exports = router;
