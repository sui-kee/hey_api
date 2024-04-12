const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");



const userSchema = mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,
    },
    name: {
        type:String,
        required: true,
    },
    role: {
        type: String,
        enum:["BASIC"||"ADMIN"],
        required: true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("User", userSchema);
