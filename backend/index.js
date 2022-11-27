const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL , {useNewUrlParser: true , useUnifiedTopology: true,})
    .then(() => {
        
    })
    .catch((err) => {
        
    })

app.use("/users", userRoute);
app.use("/pins", pinRoute);


app.listen(8800, () => {
    
})