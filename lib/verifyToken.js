"use strict";

var jwt = require('jsonwebtoken');

var verifyToken = function (req, cb) {
    var token = req.headers.Authorization

    jwt.verifyToken(token, "secret", function(err, tokendata){
        if(err){
            return cb({
                statuscode: 401,
                message: "Unauthorized error"
            });
        }
        if(tokendata){
            return cb({
                decodedToken: tokendata,
                message: "Authorized user"
            });
        }
    })
}

exports.verifyToken = verifyToken;


