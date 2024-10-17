const mongoose = require("mongoose")
const validator = require("validator")

/**
 * usename
 * password
 * email
 * userID
 */

const userSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     userId:{
        type:String,
        required:true,
        
     },
     email:{
        type:String,
        required:true,
        unique:[true, "email is already taken"],
        validate(value){
           if(!validator.isEmail(value)){
            throw new error("Invalid email")
           }
        }
     },

     password:{
        type:String,
        required:true
     }
},{timestamps:true, versionKeys:false})

module.exports = mongoose.model("Student", userSchema)