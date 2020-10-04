const router = require('express').Router();
const mongoose = require('mongoose');
const signupModel = mongoose.model('sighnup');
router.post('/', async (req, res) => {
    let email = req.body.email;
    let pass = req.body.password;
    if (email != undefined && pass != undefined) {
        await signupModel.findOne({ email: email }, function (err, docs) {
            if (!err) {
                docs.comparePassword(pass, function (err1, isMatch) {
                    if (err1) {
                        res.status(500);
                        res.send("Something went wrong");
                    }
                    else {
                        if (isMatch) {
                            res.status(200);
                            res.send("login success");
                        }
                        else {
                            res.status(401);
                            res.send("login failed");
                        }
                    }
                });
            }
            else {
                res.status(500);
                res.send("Something went wrong");
            }
        });
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


module.exports = router;