var mongoose = require ('mongoose');

var registerModel = new  mongoose.Schema({
  
    email: String,
    password: String,
    phone: String,
    role: String
});

var productModel = new  mongoose.Schema({
  
    productname: String,
    discription: String,
    price: String,
    imagepath: String,
    imagetype: String,

});


var profileModel = new  mongoose.Schema({
  
    fullname: String,
    phone: String,
    address: String,
    pincode: String,
    loginid: String
});


var imageModel = new mongoose.Schema({
    productId: String,
    mimetype: String,
    ImagePath: String
})

mongoose.model("register", registerModel);
mongoose.model("product", productModel);
mongoose.model("image", imageModel);
mongoose.model("profile", profileModel);

