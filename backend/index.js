const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGO_URL , {useNewUrlParser: true , useUnifiedTopology: true,})
    .then(() => {
        console.log("Connected");
    })
    .catch((err) => {
        console.log(err);
    })


app.listen(8080, () => {
    console.log("Backend is running");
})