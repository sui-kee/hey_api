// {
//     "name": "SN1",
//     "type": "sneaker",
//     "madeIn": "Japan",
//     "image": "https://firebasestorage.googleapis.com/v0/b/tsnproject-4c406.appspot.com/o/sneakers%2F4.jpg?alt=media&token=24f9d944-b1cd-45b4-b778-05fee43a7ebe",
//     "price": 28000,
//     "left": 10,
//     "total": 10,
//     "solded": 0,
//     "description": " Most attractive ones these days. It became one of trending sneakers. Start trending since 2022 "
// }
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productSchema = mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum:["hoody","sneaker","dress","event"],
        required: true,
    },
    madeIn: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    left: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    solded: {
        type: Number,
        required: true,
    },
    discountPercent: {
        type: Number,
        default:0
    },
    description: {
        type: String,
        default:"no description...."
    },
});

module.exports = mongoose.model("Product", productSchema);
