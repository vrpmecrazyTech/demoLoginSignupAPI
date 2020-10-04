const router = require('express').Router();
const mongoose = require('mongoose');
const signupModel = mongoose.model('sighnup');
const httpError = require('http-errors');
router.delete('/', async (req, res) => {
    let email = req.body.email;
    signupModel.find({ email: email }).then(re => {
        if (re.length > 0) {
            signupModel.deleteOne({ email: email }).then(r => {
                res.status(200).send("deleted sucessfully..")
            }).catch(err => {
                res.status(400).send("failed")
            })
        } else
            res.status(400).send("failed")
    }).catch(err => {
        res.status(400).send("failed")
    })
})

router.put('/:id', async (req, res) => {
    const result = await signupModel.findByIdAndUpdate({
        _id: req.params.id
    },
        req.body,
        {
            new: true,
            runValidator: true
        })
    res.send(result)
})


module.exports = router;