const mongoose = require("mongoose");
const mongodbErrorHandler = require('mongoose-mongodb-errors')
require("dotenv").config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.plugin(mongodbErrorHandler);
mongoose.connection.on('connected',()=>{
  console.log('Mongoose is connected..')
})



