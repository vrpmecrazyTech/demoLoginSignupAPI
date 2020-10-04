const router = require('express').Router();
const mongoose = require('mongoose');
const signupModel = mongoose.model('sighnup');
const passwordEncryption = require('../common/functions');

router.post('/', async (req, res) => {
    await signupModel.find({ email: req.body.email }).then(async rs => {
        if (rs.length == 0) {
            const signup = await signupModel();
            signup.name = req.body.name;
            signup.mobile = req.body.mobile;
            signup.email = req.body.email;
            signup.age = req.body.age;
            signup.password = req.body.password;
            signup.save((err, doc) => {
                if (!err) {
                    res.status(200);
                    res.send("Registered successfully");
                }
                else {
                    if (err.name == 'ValidationError') {
                        handlevalidationError(err, req.body);
                        res.status(500);
                        res.send(req.body);
                    }
                }
            })
        } else {
            res.status(400).send("user already exist..")
        }
    })
})

function handlevalidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break
            case 'email':
                body['emailError'] = err.errors[field].message;
                break
            case 'mobile':
                body['mobileError'] = err.errors[field].message;
                break
            case 'age':
                body['ageError'] = err.errors[field].message;
                break
            case 'password':
                body['passwordError'] = err.errors[field].message;
                break
        }
    }
}


module.exports = router;