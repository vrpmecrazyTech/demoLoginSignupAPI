'use strict';
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt');
const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    }
},
    {
        timestamps: true
    })


loginSchema.plugin(uniqueValidator);

module.exports = mongoose.model("login", loginSchema);