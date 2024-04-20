const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");


const orderSchema = mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,
    },
    orderCode:{
        type:String,
        default:uuidv4,
        unique:true,
        required:true,
    },
    customer:{
        type:Object,
        required:true,
    },
    orderTime:{
        type:Date,
        default:Date.now,
    },
    total:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    products:[{
        type:Object,
        required:true,
    }],
});

module.exports = mongoose.model("Order", orderSchema);
