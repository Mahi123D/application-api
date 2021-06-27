var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/register',{useNewUrlParser:true , useUnifiedTopology: true },(error)=>{
if(!error){
  console.log("mongodb coonected")
}  
else{
  console.log("mongodb is not coonected",error);
}
})

const register = require("./index");