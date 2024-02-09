require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Import Product model and connect to MongoDB
const Products = require("./modals/products");
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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

// Root route
app.get("/products", async (req, res) => {
    try {
        // Query the database to retrieve all products
        const products = await Products.find();

        // Respond with the retrieved products
        res.json(products);
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
