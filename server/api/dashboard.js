var express = require('express');
var router = express.Router();
var controller = require("./dashboard.controller");
var verifyToken = require('../../lib/verifyToken');

// router.get("/",verifyToken, controller.getAllUsers);
// router.post("/login", controller.login);

module.exports = router;