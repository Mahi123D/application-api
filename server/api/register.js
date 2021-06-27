var express = require('express');
var router = express.Router();
var controller = require("./register.controller");

router.post("/", controller.registerUser);
router.post("/login", controller.login);

module.exports = router;