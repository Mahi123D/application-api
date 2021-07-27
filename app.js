const express = require('express');
const mongoose = require('mongoose')
var bodyparser = require('body-parser');
var multer = require('multer');
var http = require('http');
// const fetch = require('node-fetch');

const app = express();

var cors = require('cors');
app.use(cors());
app.use(bodyparser.json());
var connection = require('./model/connection');

var imageModel = mongoose.model("image");

app.use('/uploads', express.static('uploads'));

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("server started on " + PORT));

app.use('/register', require("./server/api/register"));
app.use('/product', require("./server/api/product"));
app.use('/profile', require("./server/api/profile"));
app.use('/product', require("./server/api/product"));


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
});


app.post('/files', upload.single('file'), (req, res, cb) => {

    const file = req.file;
    var productId = JSON.parse(JSON.stringify(req.body.productId));
    console.log("productId",productId);
    if (!file) {
        return cb({
            statuscode: 400,
            status: "error",
            message: "error while uploading the file"
        })
    }
    var query = {},
        update = {
            productId: productId,
            mimetype: req.file.mimetype,
            ImagePath: req.file.path
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false };

    // Find the document
    imageModel.findOneAndUpdate(query, update, options, function (error, docs) {
        console.log("errror", error);
        console.log("docs",docs);

        if (docs) {
            return cb({
                details: docs,
                statuscode: 200,
                status: "success"
            })
        }
        // do something with the document
    });
    
});


app.get('/getImage/:fileId', (req, res, cb) => {
    var id = req.params.fileId;

    imageModel.findOne({ productId: id }, (e, r) => {
        console.log("rrrrrrrrrrrr", r);
        res.send({
            details: r,
            statuscode: 200,
            status: "success"
        });
    })

});
