
"use strict";
var mongoose = require('mongoose');
var registerModel = mongoose.model("register");

var getAllUsers = function (email, cb) {
    console.log("email", email);
    registerModel.find({ email: email }, (e, r) => {

        if (e || r) {
            return cb(true);
        }
        return cb(false);
    })

}
exports.getAllUsers = getAllUsers;
