"use strict";

var product_lib = require("../../lib/product/index");


var saveProduct = function (req, res) {
    // console.log("req=-==========",req);

    var context = {
        req: req,
        body: req.body 
    }
    product_lib.saveProduct(context, function (e, r){
        return res.json (e || r);
    });

}


var allProduct = function(req, res){
    var context = {
        req: req,
        body: req.body 
    }
    product_lib.allProduct(context, function (e, r){
        return res.json (e || r);
    });
}



var getProduct = function(req, res){
    // console.log("context",req.params.id);
    var context = {
        req: req,
        body: req.body,
        id: req.params.id
    }
    product_lib.getProduct(context, function (e, r){
        return res.json (e || r);
    });
}

var deleteProduct = function(req, res){
    // console.log("context".context);

    var context = {
        req: req,
        body: req.body,
        id: req.params.id 
    }
    product_lib.deleteProduct(context, function (e, r){
        return res.json (e || r);
    });
}

var getAllProduct = function(req, res){
    var context = {
        req: req,
        body: req.body 
    }
    product_lib.getAllProduct(context, function (e, r){
        return res.json (e || r);
    });
}

var saveSelectedProduct = function(req, res){
    var context = {
        req: req,
        body: req.body 
    }
    product_lib.saveSelectedProduct(context, function (e, r){
        return res.json (e || r);
    });
}


var deleteSelectedProduct = function(req, res){
    var context = {
        req: req,
        body: req.body
    }
    product_lib.deleteSelectedProduct(context, function (e, r){
        return res.json (e || r);
    });
}


var getSelectedProduct = function(req, res){
    // console.log("context",req.params.id);
    var context = {
        req: req,
        body: req.body
    }
    product_lib.getSelectedProduct(context, function (e, r){
        return res.json (e || r);
    });
}


exports.saveProduct = saveProduct;
exports.allProduct = allProduct;
exports.getProduct = getProduct;
exports.deleteProduct = deleteProduct;
exports.getAllProduct = getAllProduct;
exports.saveSelectedProduct = saveSelectedProduct;
exports.deleteSelectedProduct = deleteSelectedProduct;
exports.getSelectedProduct = getSelectedProduct;

