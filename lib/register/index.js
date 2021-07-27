
"use strict";

var mongoose = require('mongoose');
var registerModel = mongoose.model("register");
var encryptionApi = require("../../server/api/encryption");
var jwt = require('jsonwebtoken');

var hasEmail = function (email, cb) {
    registerModel.findOne({ email: email }, (e, r) => {
        if (e || r) {
            return cb(true);
        }
        return cb(false);
    })

}
var registerUser = function (context, cb) {
console.log("context.body",context.body);
    hasEmail(context.body.email, function (email) {
        if (email) {
            return cb({
                statuscode: 401,
                status: "error",
                message: "this email id is already registered"
            });
        }
        encryptionApi.hashText(context.body.pass, function (e, newPass) {

            var register = new registerModel();

            register.email = context.body.email;
            register.password = newPass;
            register.phone = context.body.phone;
            register.role = context.body.role
            register.save((err, docs) => {
                return cb({
                    statuscode: 200,
                    status: "success"
                });
            });
        });
    });

}


var validatePassword = function (pass, hashPass, cb) {
    encryptionApi.areEqual(pass, hashPass, cb);
};

var login = function (context, cb) {
console.log("context",context);
    registerModel.findOne({ email: context.body.email, role: context.body.role }, (e, r) => {
        if (!r) {
            return cb({
                status: "error",
                message: "this email id is not registered. please register it."
            });
        } else if (r) {
            validatePassword(context.body.pass, r.password, function (pass) {
                if (pass) {

                    var token = jwt.sign({ email: context.body.email }, 'secret');

                    return cb({
                        statuscode: 200,
                        status: "success",
                        token: token,
                        details: r
                    });

                } else if (pass == false) {
                    return cb({
                        statuscode: 401,
                        status: "error",
                        message: "worng password"
                    });
                }
            })
        }
    })
}


exports.registerUser = registerUser;
exports.login = login;
