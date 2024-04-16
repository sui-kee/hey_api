require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3001;

// Import Product model and connect to MongoDB
const Products = require("./modals/products");
const Users = require("./modals/user");
const products = require('./modals/products');
mongoose.connect(process.env.MONGO_DB_URI, { })
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("Error connecting to MongoDB:", error));

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to create a new product
app.post("/products", async (req, res) => {
    try {
        // Create a new product instance based on the request body
        const newProduct = await Products.create(req.body);

        // Respond with the saved product
        res.status(201).json(newProduct);
    } catch (error) {
        // If there's an error, respond with an error status and message
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
});

app.post("/user", async (req, res) => {
    try {
        // Create a new product instance based on the request body
        const newUser = await Users.create(req.body);

        // Respond with the saved product
        res.status(201).json(newUser);
    } catch (error) {
        // If there's an error, respond with an error status and message
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
});

app.get("/user",async(req,res)=>{
    const {email} = req.query
    try {
        const user = await Users.find({email:email})
        res.status(201).json(user)
    } catch (error) {
        console.log(error,"from user fetching");
        res.status(500).json({error:`error in fetching user with ${email}`})
    }
})

app.get("/users",async(req,res)=>{
    // const {email} = req.query
    try {
        const users = await Users.find()
        res.status(201).json(users)
    } catch (error) {
        console.log(error,"from user fetching");
        res.status(500).json({error:`error in fetching user with ${email}`})
    }
})

app.get("/user/id",async(req,res)=>{
    const {id} = req.query
    try {
        const user = await Users.find({id:id})
        res.status(201).json(user)
    } catch (error) {
        console.log(error,"from user fetching");
        res.status(500).json({error:`error in fetching user with ${email}`})
    }
})


// Root route
app.get("/products", async (req, res) => {
    try {
        const {sortBy,type} = req.query
        let sortOption = {}
        if (sortBy === 'price') {
            sortOption = { price: -1 };
        } else if (sortBy === 'discountPercent') {
            sortOption = { discountPercent: -1 };
        } else if (sortBy === 'name') {
            sortOption = { name: 1 };
        }
        // Query the database to retrieve all products
        const products = await Products.find({type:type}).sort(sortOption);

        // Respond with the retrieved products
        res.status(201).json(products);
    } catch (error) {
        // If there's an error, respond with an error status and message
        console.error("Error retrieving products:", error);
        res.status(500).json({ error: "Failed to retrieve products" });
    }
});

app.get("/allProducts", async (req, res) => {
    try {
        const products = await Products.find();

        // Respond with the retrieved products
        // console.log("response products from server: ",products);
        res.status(201).json(products);
    } catch (error) {
        // If there's an error, respond with an error status and message
        console.error("Error retrieving products:", error,products);
        res.status(500).json({ error: "Failed to retrieve products" });
    }
});

app.get("/product/id", async (req, res) => {
    const {id} = req.query
    try {
        const product = await Products.find({id:id});

        // Respond with the retrieved products
        // console.log("response products from server: ",product);
        res.status(201).json(product);
    } catch (error) {
        // If there's an error, respond with an error status and message
        console.error("Error retrieving products:", error,products);
        res.status(500).json({ error: "Failed to retrieve products" });
    }
});
//for discounted products
app.get("/products/discount/dress", async (req, res) => {
    try {
        // Query the database to retrieve products where discountPercent is greater than 0
        const products = await Products.find({ discountPercent: { $gt: 0 },type:"dress"});

        // Respond with the retrieved products
        console.log("dress api");
        res.status(200).json(products);
    } catch (error) {
        // If there's an error, respond with an error status and message
        console.error("Error retrieving products:", error);
        res.status(500).json({ error: "Failed to retrieve products" });
    }
});
app.get("/products/discounts", async (req, res) => {
    try {
        // Query the database to retrieve products where discountPercent is greater than 0
        const products = await Products.find({ discountPercent: { $gt: 0 }});

        // Respond with the retrieved products
        res.status(200).json(products);
    } catch (error) {
        // If there's an error, respond with an error status and message
        console.error("Error retrieving products:", error);
        res.status(500).json({ error: "Failed to retrieve products" });
    }
});
app.get("/products/discount/hoody", async (req, res) => {
    try {
        // Query the database to retrieve products where discountPercent is greater than 0
        const products = await Products.find({ discountPercent: { $gt: 0 },type:"hoody"});

        // Respond with the retrieved products
        console.log("hoody api");
        res.status(200).json(products);
    } catch (error) {
        // If there's an error, respond with an error status and message
        console.error("Error retrieving products:", error);
        res.status(500).json({ error: "Failed to retrieve products" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Node API running on port ${PORT}`);
});
