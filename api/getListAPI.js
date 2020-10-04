const router = require('express').Router();
const mongoose = require('mongoose');
const signupModel = mongoose.model('sighnup');

router.post('/', async (req, res) => {

    let query = { age: { $gte: 0 } };
    let queryParams = req.query;
    let protectedKeys = ['email'];
    let populate = ""

    await signupModel.findAndFilter(query, queryParams, protectedKeys)
        .then((users) => {
            res.status(200);
            res.send(users);
        })
        .catch(err => {
            res.status(200);
            res.send("something went wrong");
        })
})

router.get('/', function (req, res, next) {
     signupModel.find().then(r=>{
        res.status(200).send(r)
    })
    
  })


module.exports = router;