const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.send(" this is sending from node")
})

app.listen(3000,()=>{
    console.log("Node api at port 3000");
})