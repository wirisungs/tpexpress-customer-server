const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

// Đăng nhập
router.post("/login", controller.login);
router.post("/register", controller.register);

module.exports = router;
