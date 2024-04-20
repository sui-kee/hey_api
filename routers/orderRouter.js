const express = require('express');
const router = express.Router();
const Order = require("../modals/order");

// Create a new order
router.post("/newOrder", async (req, res) => {
    try {
        const newOrder = await Order.create(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
});

// Delete order by ID
router.delete("/delete/:orderId", async (req, res) => {
    try {
        const deletedOrder = await Order.deleteOne({id:req.params.orderId});
        if (!deletedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ error: "Failed to delete order" });
    }
});

// Update order by ID
router.put("/:orderId", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Failed to update order" });
    }
});

router.get("/:orderId", async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        console.error("Error retrieving order:", error);
        res.status(500).json({ error: "Failed to retrieve order" });
    }
});

router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ error: "Failed to retrieve orders" });
    }
});

module.exports = router;
