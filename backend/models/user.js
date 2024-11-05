import mongoose from "mongoose";

const userSchema =mongoose.Schema({
    avatar : {
        type : String
    },
    bio : {
        type : String
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    address : {
        type : String,
    },
    password : {
        type : String,
        required : true
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
},{
    timeStamps : true
})

export const User = mongoose.model("user", userSchema)