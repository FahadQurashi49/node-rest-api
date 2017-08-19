const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');


// get a list of ninjas in db
router.get('/ninjas', function(req, res, next) {
  // Ninja.find({}).then(function(ninjas) {
  //   res.send(ninjas);
  // });
// find the nearest ninjas
// which are under 100km radius
// send lng = -80 and lat = 25 as query params
Ninja.geoNear(
  {type:'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
  {maxDistance: 100000, spherical: true}
).then(function(ninjas) {
  res.send(ninjas);
}).catch(next);

});
// add a new ninja from db
router.post('/ninjas', function(req, res, next) {
  Ninja.create(req.body).then(function (ninja) {
    res.send(ninja);
  }).catch(next);
});
// update a ninja in db
router.put('/ninjas/:id', function(req, res) {
  Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
    // mongo not giving me latest ninja in this callback
    // so need to retrive it here again
    // a man has to do what he has to do
    Ninja.findOne({_id: req.params.id}).then(function (ninja) {
      res.send(ninja);
    });

  });

});
// delete a ninja in db
router.delete('/ninjas/:id', function(req, res, next) {
  Ninja.findByIdAndRemove({_id: req.params.id}).then(function (ninja) {
    res.send(ninja);
  }).catch(next);


});

module.exports = router;
