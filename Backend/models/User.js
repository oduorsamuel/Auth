const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        dafault:Date.now()
    }

})
module.exports=User=mongoose.model('users',userSchema);