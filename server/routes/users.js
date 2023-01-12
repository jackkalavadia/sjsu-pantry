const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");

router.post("/get-user", usersController.getSingleUser);
router.post("/add-user", usersController.postAddUser);

module.exports = router;
