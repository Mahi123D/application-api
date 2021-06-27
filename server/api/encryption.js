'use strict';

const bcrypt = require('bcrypt');

var encrypt = function (text, cb){

};

var decrypt = function (text, cb){

};


var hashText = function (text, cb){
      bcrypt.hash(text, 10, cb);
};

var areEqual = function (text, hash, cb){
    bcrypt.compare (text, hash, function(err, res){
        if (res){
            return cb (true);
        }
        return cb (false);
    });
};


/****** All public  */

exports.encrypt  = encrypt;
exports.decrypt  = decrypt;
exports.hashText = hashText;
exports.areEqual = areEqual;