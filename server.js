require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const userRoutes = require("./routers/userRouter")
const productRoutes = require("./routers/productRouter")
const orderRoutes = require("./routers/orderRouter")
const corsOptions ={
    origin:"http://localhost:3000", 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const PORT =  3001;

// Import Product model and connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI, { })
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("Error connecting to MongoDB:", error));

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/users",userRoutes)
app.use("/products",productRoutes)
app.use("/orders",orderRoutes)

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Perform cleanup tasks if necessary
    process.exit(1); // Exit the process
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the rejection or log the error
});

// Start the server
app.listen(PORT, () => {
    console.log(`Node API running on port ${PORT}`);
});
