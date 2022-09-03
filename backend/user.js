// Setting up the user schema using mongoose

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,  
})

module.exports = mongoose.model("User2", userSchema); 