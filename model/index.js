var mongoose = require ('mongoose');

var registerModel = new  mongoose.Schema({
  
    fullName: String,
    email: String,
    password: String,
    phone: String,
    addresses: [String]
})

mongoose.model("register", registerModel);

