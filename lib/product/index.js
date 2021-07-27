
"use strict";

var mongoose = require('mongoose');
var productModel = mongoose.model("product");
var imageModel = mongoose.model('image');
var async = require('async');

var saveProduct = ((context, cb) => {

    var product = new productModel();

    if (!context.body._id) {
        product.productname = context.body.productname;
        product.discription = context.body.discription;
        product.price = context.body.price;
        product.save((err, docs) => {
            return cb({
                details: docs,
                statuscode: 200,
                status: "success"
            });
        });
    } else {
        var data = {
            productname: context.body.productname,
            discription: context.body.discription,
            price: context.body.price
        }

        productModel.findOneAndUpdate({ _id: context.body._id }, { $set: data }, { useFindAndModify: false }, (err, docs) => {
            // console.log("successs--------------------", docs)
            return cb({
                details: docs,
                statuscode: 200,
                status: "success"
            });
        });
    }
});



var allProduct = function (context, cb) {
    // console.log("context", context);
    productModel.find((e, r) => {
        return cb({
            products: r
        })
    })
}

var getProduct = function (context, cb) {
    // console.log("context", context);
    productModel.findOne({ _id: context.id }, (e, r) => {
        return cb({
            product: r
        })
    })
}

var deleteProduct = function (context, cb) {
    // console.log("context", context);
    productModel.deleteOne({ _id: context.id }, (e, r) => {
        return cb({
            msg: 'product successfully deleted'
        })
    })
}


var getAllProduct = function (context, cb) {
    productModel.find({}, (e, r) => {
        imageModel.find({}, function (err, image) {

            return cb({
                product: r,
                image: image
            })
        })

    })

}
exports.saveProduct = saveProduct;
// exports.saveImage = saveImage;
exports.allProduct = allProduct;
exports.getProduct = getProduct;
exports.deleteProduct = deleteProduct;
exports.getAllProduct = getAllProduct;