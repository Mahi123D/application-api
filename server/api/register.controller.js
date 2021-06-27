"use strict";

var register_lib = require("../../lib/register/index.js");
var encryptionApi = require("../api/encryption");
var mongoose = require('mongoose');
var doctorModel = mongoose.model("register");


var registerUser = function (req, res) {
console.log("reqqqqqq",req)
    var context = {
        req: req,
        body: req.body 
    }

    register_lib.registerUser(context, function (e, r){
        return res.json (e || r);
    });

}


var login = function(req, res){
    var context = {
        req: req,
        body: req.body 
    }
    register_lib.login(context, function (e, r){
        return res.json (e || r);
    });
}


exports.registerUser = registerUser;
exports.login = login;
