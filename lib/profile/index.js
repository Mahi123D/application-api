
"use strict";

var mongoose = require('mongoose');
var profileModel = mongoose.model("profile");

var saveProfile = (context, cb) => {
    // console.log("context",context);
    var profile = new profileModel();

    profileModel.findOne({ loginid: context.id }, (e, r) => {

        if (!r) {
            profile.fullname = context.body.fullname;
            profile.phone = context.body.phone;
            profile.address = context.body.address;
            profile.pincode = context.body.pincode;
            profile.loginid = context.id
            profile.save((err, docs) => {
                return cb({
                    details: docs,
                    statuscode: 200,
                    status: "success"
                });
            });
        } else {
            var data = {
                fullname: context.body.fullname,
                phone: context.body.phone,
                address: context.body.address,
                pincode: context.body.pincode
            }

            profileModel.findOneAndUpdate({ loginid: context.id }, { $set: data }, { useFindAndModify: false }, (err, docs) => {
                console.log("successs--------------------", docs)
                return cb({
                    details: docs,
                    statuscode: 200,
                    status: "success"
                });
            });
        }
    });
};

var getProfile = function (context, cb) {
    // console.log("context", context);
    profileModel.findOne({ loginid: context.id }, (e, r) => {
        return cb({
            profile: r
        })
    })
}


exports.saveProfile = saveProfile;
exports.getProfile = getProfile;
