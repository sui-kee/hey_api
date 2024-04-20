const express = require('express');
const router = express.Router();

const Products = require("../modals/products")

router.post("/products", async (req, res) => {
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

router.get("/products", async (req, res) => {
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

router.get("/allProducts", async (req, res) => {
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

router.get("/product/id", async (req, res) => {
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
router.get("/products/discount/dress", async (req, res) => {
    try {
        // Query the database to retrieve products where discountPercent is greater than 0
        const products = await Products.find({ discountPercent: { $gt: 0 },type:"dress"});

        // Respond with the retrieved products
        console.log("dress api");
        res.status(201).json(products);
    } catch (error) {
        // If there's an error, respond with an error status and message
        console.error("Error retrieving products:", error);
        res.status(500).json({ error: "Failed to retrieve products" });
    }
});
router.get("/products/discounts", async (req, res) => {
    try {
        // Query the database to retrieve products where discountPercent is greater than 0
        const products = await Products.find({ discountPercent: { $gt: 0 }});

        // Respond with the retrieved products
        res.status(201).json(products);
    } catch (error) {
        // If there's an error, respond with an error status and message
        console.error("Error retrieving products:", error);
        res.status(500).json({ error: "Failed to retrieve products" });
    }
});
router.get("/products/discount/hoody", async (req, res) => {
    try {
        // Query the database to retrieve products where discountPercent is greater than 0
        const products = await Products.find({ discountPercent: { $gt: 0 },type:"hoody"});

        // Respond with the retrieved products
        console.log("hoody api");
        res.status(201).json(products);
    } catch (error) {
        // If there's an error, respond with an error status and message
        console.error("Error retrieving products:", error);
        res.status(500).json({ error: "Failed to retrieve products" });
    }
});


module.exports = router;