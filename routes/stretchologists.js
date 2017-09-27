const mongoose = require('mongoose');
const Stretchologist = mongoose.model('stretchologists');
const StretchologistsLocations = mongoose.model('stretchologistsLocations');


module.exports = app => {

  // Create stretchologist profile
  app.post('/api/stretchologists' , (req, res, next) => {
    const { firstName, lastName, rating, vehicle} = req.body;
    const { year, model, make, color } = vehicle;
    const stretchologist = new Stretchologist({
      firstName,
      lastName,
      rating,
      vehicle: {
        year,
        model,
        make,
        color
      }
    });

    try {
      stretchologist.save();
      res.status(200).send(stretchologist);
    } catch(err){
      next(err)
    }
  });

  // Create stretchologist generate location
  app.post('/api/stretchologists_locations' , (req, res, next) => {
    StretchologistsLocations.create(req.body)
    .then(location => {
      res.status(200).send(location);
    })
    .catch(next);
  });

  // Update stretchologist location
  app.put('/api/stretchologists_locations/:id', (req, res, next) => {
    const io = req.app.io;
    if(!req.body){
      res.status(400).send({ error: 'bad data'})
    } else {
      const stretchologistId = req.params.id
      const stretchologistProps = req.body;

      StretchologistsLocations.findOneAndUpdate({ StretchologistId: stretchologistId },
        { $set: { socketId: req.body.socketId }}, { new: true })
          .then(location => res.status(200).send(location))
          .catch(next);
    }
  });

  // GET nearby stretchologists
  app.get('/api/stretchologists_nearby', (req, res, next) => {
    const { lng, lat } = req.query;
    StretchologistsLocations.geoNear({
      type: 'Point' ,
      coordinates: [ parseFloat(lng), parseFloat(lat) ]
    },
    { spherical: true, maxDistance: 10000 }) //10kilometers
      .then( locations => res.send(locations))
      .catch(next);
  });

  // GET All stretchologists locations
  app.get('/api/stretchologists_locations', (req, res, next) => {
    StretchologistsLocations.find({})
    .then(locations => res.status(200).send(locations))
    .catch(next);
  });

  // GET All stretchologists
  app.get('/api/stretchologists', (req, res, next) => {
    Stretchologist.find({})
    .then(stretchologist => res.status(200).send(stretchologist))
    .catch(next);
  });

}
