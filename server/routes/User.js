const express = require("express");
const router = express.Router();

const userController = require("../controller/userController")

router.get("/", userController.getAllUsers);

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

module.exports = router;
