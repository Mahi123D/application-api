"use strict";

var profile_lib = require("../../lib/profile/index");

var saveProfile = function (req, res) {
    console.log("req=-==========",req);

    var context = {
        req: req,
        body: req.body.profile,
        id: req.body.id
    }
    profile_lib.saveProfile(context, function (e, r){
        return res.json (e || r);
    });

}


var getProfile = function(req, res){
    // console.log("context",req.params.id);
    var context = {
        req: req,
        body: req.body,
        id: req.params.id
    }
    profile_lib.getProfile(context, function (e, r){
        return res.json (e || r);
    });
}

exports.saveProfile = saveProfile;
exports.getProfile = getProfile;
