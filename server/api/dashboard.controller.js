"use strict";

var dashboard_lib = require("../../lib/dashboard/index");

var  getAllUsers= function (req, res) {
console.log("reqqqqqq",req)
    var context = {
        req: req,
        body: req.body 
    }

    dashboard_lib.getAllUsers(context, function (e, r){
        return res.json (e || r);
    });

}


exports.getAllUsers = getAllUsers;
