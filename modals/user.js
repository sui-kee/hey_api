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
    },
    profileImg:{
        type:String,
        default: "https://firebasestorage.googleapis.com/v0/b/heyshop-9658b.appspot.com/o/hat.png?alt=media&token=da385753-74c2-4b06-8e86-1758009346a4",
        required: true,
    }
});

module.exports = mongoose.model("User", userSchema);
