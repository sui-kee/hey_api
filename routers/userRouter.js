const express = require('express');
const router = express.Router();

const Users = require("../modals/user")
// POST endpoint to create a new product
router.post("/create", async (req, res) => {
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

router.get("/getUserByEmail",async(req,res)=>{
    const {email} = req.query
    try {
        const user = await Users.find({email:email})
        res.status(201).json(user)
    } catch (error) {
        console.log(error,"from user fetching");
        res.status(500).json({error:`error in fetching user with ${email}`})
    }
})

router.get("/getAllUsers",async(req,res)=>{
    // const {email} = req.query
    try {
        const users = await Users.find()
        res.status(201).json(users)
    } catch (error) {
        console.log(error,"from user fetching");
        res.status(500).json({error:`error in fetching user with ${email}`})
    }
})

router.get("/getUserById",async(req,res)=>{
    const {id} = req.query
    try {
        const user = await Users.find({id:id})
        res.status(201).json(user)
    } catch (error) {
        console.log(error,"from user fetching");
        res.status(500).json({error:`error in fetching user with ${email}`})
    }
})


module.exports = router;
