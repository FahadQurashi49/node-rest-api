const express = require('express');
const router = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express
const app = express();
// json parser middleware
app.use(bodyParser.json());

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;
// initialize routes
app.use('/api', router);
// error handling middleware
app.use(function (err, req, res, next) {
  res.status(422).send({error: err.message});
});

app.listen(process.env.port || 4000, function () {
  console.log('listening for requests');
});
