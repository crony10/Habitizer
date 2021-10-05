const express = require("express");
const app = express()
const cors = require("cors");


// middleware
app.use(express.json()); //req.body
app.use(cors());


// ROUTES //


// Register and login routes //
app.use("/auth",require("./routes/jwtAuth"));

// Dashboard route //
app.use("/dashboard",require("./routes/dashboard"))

app.listen(5000,()=>{
    console.log("server is running on 5000");
})