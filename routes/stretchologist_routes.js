const mongoose = require('mongoose');
const Stretchologist = mongoose.model('stretchologists');


module.exports = app => {

  // Create stretchologist generate location
  app.post('/api/stretchologists' , (req, res, next) => {
    Stretchologist.create(req.body)
    .then(location => {
      res.status(200).send(location);
    })
    .catch(next);
  });

  // Update stretchologist location
  app.put('/api/stretchologists_locations/:id', (req, res, next) => {
    if(!req.body){
      res.status(400).send({ error: 'bad data'})
    } else {
      const stretchologistId = req.params.id
      const stretchologistProps = req.body;

      Stretchologist.findOneAndUpdate(
        { stretchologistId: stretchologistId },
        { $set: { socketId: req.body.socketId }},
        { new: true })
          .then(location => res.status(200).send(location))
          .catch(next);
    }
  });

  // GET nearby stretchologists
  app.get('/api/stretchologists_nearby', (req, res, next) => {
    const { lng, lat } = req.query;
    Stretchologist.geoNear({
      type: 'Point' ,
      coordinates: [ parseFloat(lng), parseFloat(lat) ]
    },
    { spherical: true, maxDistance: 10000 }) //10kilometers
      .then( locations => res.send(locations))
      .catch(next);
  });

  // GET All stretchologists locations
  app.get('/api/stretchologists_locations', (req, res, next) => {
    Stretchologist.find({})
    .then(locations => res.status(200).send(locations))
    .catch(next);
  });

}
