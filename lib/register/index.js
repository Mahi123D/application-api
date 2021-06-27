
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

    hasEmail(context.body.email, function (email) {
        if (email == true) {
            return cb({
                statuscode: 401,
                status: "error",
                message: "this email id is already registered"
            });
        }
        // if(email == )
        encryptionApi.hashText(context.body.password, function (e, newPass) {

            var register = new registerModel();

            register.email = context.body.email;
            register.password = newPass;
            register.fullName = context.body.fullName;
            register.phone = context.body.phone;
            storeMultipleAdd(context.body.addresses, function (add) {
                register.addresses = add;
            });
            register.save((err, docs) => {
                // return cb;
                return cb({
                    statuscode: 200,
                    status: "success"
                });
            });
        });
    });

}

var storeMultipleAdd = function (addreses, cb) {
    var address = [];

    for (var i = 0; i < addreses.length; i++) {
        address.push(addreses[i].address)
    }
    return cb(address);


}

var validatePassword = function (pass, hashPass, cb) {
    encryptionApi.areEqual(pass, hashPass, cb);
};

var login = function (context, cb) {

    registerModel.findOne({ email: context.body.email.toLowerCase() }, (e, r) => {
        if (!r) {
            return cb({
                status: "error",
                message: "this email id is not registered. please register it."
            });
        } else if (r) {
            validatePassword(context.body.password, r.password, function (pass) {
                if (pass == true) {

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
