const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const morgan = require('morgan');
var cookieSession = require('cookie-session')
require('express-async-errors');

//models
require("./models/signupModel");
require("./models/loginModel");

//connection DB
require("./include/connection");

//middleware
app.use(bodyparser.json())
    .use(morgan());

app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))

  
app.use('/user/signup', require('./api/signupApi'));
app.use('/user/login', require('./api/loginAPI'));
app.use('/user/getList', require('./api/getListAPI'));
app.use('/user/deleteAndUpdate', require('./api/updateDeleteAPI'));
app.use('/user/loginToken', require('./api/loginWithTOken'));


// custome middleware for error handeling
//not found route
app.use((req, res, next) => {
    req.status = 404;
    const error = new Error("route not found");
    next(error);
});

// error hangle
if (app.get("env") === "production") {
    app.use((error, req, res, next) => {
        res.status(req.status || 500).send({
            message: error.message,
        })
    })

}
app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
        message: error.message,
        stack: error.stack
    })
})
// error hangle

app.listen(8080, () => {
    console.log("server is running on url : http://localhost:8080");
});