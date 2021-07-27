var express = require('express');
var router = express.Router();
var controller = require("./profile.controller");

router.post("/", controller.saveProfile);
router.get("/getProfile/:id", controller.getProfile);

module.exports = router;