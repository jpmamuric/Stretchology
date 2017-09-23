const mongoose = require('mongoose');
const Contractor = mongoose.model('contractors');

module.exports = {
  create(req, res, next) {
    Contractor.create(req.body)
    .then( contractor => {
      res.send(contractor);
    })
    .catch(next);
  },

  all(req, res, next){
    Contractor.find({})
    .then(contractor => res.status(200).send(contractor))
    .catch(next);
  },

  nearby(req, res, next) {
    const { lng, lat } = req.query;
    Contractor.geoNear(
      {
        type: 'Point' ,
        coordinates: [ parseFloat(lng), parseFloat(lat) ] },
      {
        spherical: true,
        maxDistance: 10000  //10kilometers
      }
    )
     .then( drivers => res.send(drivers))
     .catch(next);
  }
}
