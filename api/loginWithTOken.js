const router = require('express').Router();
const mongoose = require('mongoose');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const signupModel = mongoose.model('sighnup');
// const authConfig = require("../config/authConfig");
const authConfig = {
    EXPIRY: process.env.AUTH_EXPIRY,
    ALGORITHM: process.env.AUTH_ALGORITHM,
    PRIVATE_KEY: process.env.AUTH_PRIVATE_KEY,
    PUBLIC_KEY: process.env.AUTH_PUBLIC_KEY,
};

router.post('/', async (req, res) => {
    let email = req.body.email;
    let pass = req.body.password;
    if (email != undefined && pass != undefined) {
        signupModel.findOne({ email: email }).then(async re => {
            console.log(re)
            if (re != null) {
                let token = await generateLoginToken(re);
                res.setHeader("x-access-token", token.token);
                res.status(200).send({
                    data: token
                });
            }
            else {
                res.status(401).send("Login failed")
            }
        })
    }
    else {
        var validationErr = {
            "emailError": "Email is required",
            "passwrodError": "Password is required"
        };
        res.status(500);
        res.send(validationErr);
    }

})

router.post('/verify', async (req, res) => {
    let isVerifiedToken = await verifyJWTToken(req.body.token)
    res.status(200).send(isVerifiedToken)
})

function verifyJWTToken(token, options = {}) {
    console.log(authConfig.EXPIRY,)

    let publicKEY = fs.readFileSync(authConfig.PUBLIC_KEY, "utf8");
    let opt = {
        expiresIn: authConfig.EXPIRY,
        algorithm: [authConfig.ALGORITHM],
        ...options,
    };
    return jwt.verify(token, publicKEY, opt);
}

async function generateLoginToken(user) {
    console.log(user)
    console.log(user)
    let token = generateUserToken(user);
    return ({ token: token })
}

function generateUserToken(user) {
    let data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        age: user.age,

    };
    return generateJWTToken(data);
}

function generateJWTToken(payload = {}, options = {}) {
    let privateKEY = fs.readFileSync(authConfig.PRIVATE_KEY, "utf8");
    let opt = {
        expiresIn: Number(1),
        algorithm: authConfig.ALGORITHM,
        ...options,
    };

    return jwt.sign(payload, privateKEY, opt);
}


module.exports = router;