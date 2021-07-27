var express = require('express');
var router = express.Router();
var controller = require("./product.controller");

router.post("/saveproduct", controller.saveProduct);
router.get("/allproduct", controller.allProduct);
router.get("/getproduct/:id", controller.getProduct);
router.get("/deleteproduct/:id", controller.deleteProduct);
router.get("/getAllProduct", controller.getAllProduct);
module.exports = router;