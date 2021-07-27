var express = require('express');
var router = express.Router();
var controller = require("./product.controller");

router.post("/saveproduct", controller.saveProduct);
router.get("/allproduct", controller.allProduct);
router.get("/getproduct/:id", controller.getProduct);
router.get("/deleteproduct/:id", controller.deleteProduct);
router.get("/getAllProduct", controller.getAllProduct);
router.post("/saveSelectedProduct", controller.saveSelectedProduct);
router.post("/deleteSelectedProduct", controller.deleteSelectedProduct);
router.post("/getSelectedProduct", controller.getSelectedProduct)

module.exports = router;