'use strict';
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const mongooseFindAndFilter = require('mongoose-find-and-filter');
var bcrypt = require("bcrypt"),
    SALT_WORK_FACTOR = 10;
const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required"
    },

    mobile: {
        type: Number,
        required: "Mobile is required"
    },
    email: {
        type: String,
        required: "Email is required",
        unique: true
    },
    age: {
        type: Number,
        required: "Age is required"
    },
    password: {
        type: String,
        required: "Password is required",
    }

},
    {
        timestamps: true
    })

// custome validation 
signupSchema.path('email').validate((val) => {
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid email.')

signupSchema.path('mobile').validate(function (value) {
    return /^\d{10}$/.test(value);
}, 'Mobile number is invalid');

// var passError = `The password Must be 8 to 20 characters in length 
// Must contain at least one letter and one number and a special character from !@#$%^&*()_+ 
// Should not start with a special character
// `;
// signupSchema.path('password').validate(function (value) {
//     var passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;
//     return passRegex.test(value);
// }, passError);


signupSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

signupSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

signupSchema.plugin(mongooseFindAndFilter);
signupSchema.plugin(uniqueValidator);

module.exports = mongoose.model("sighnup", signupSchema);