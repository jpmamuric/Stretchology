const mongoose = require('mongoose');
const Bookings = mongoose.model('bookings');


module.exports = (app, io) => {
  app.get('/api/bookings', (req, res, next) => {
    console.log(req.body);
  });

  //match booking to contractor socket id
  app.get('/api/bookings/:bookingsId', (req, res, next) => {
    const match = req.params.bookingsId
    res.send(match);
  });

  app.post('/api/bookings', (req, res, next) => {
    const { googleDisplayName } = req.body;
    const { socketId, StretchologistId, geometry } = req.body.nearbyStretchologist.obj;
    let latitude = geometry.coordinates[1];
    let longitude = geometry.coordinates[0];
    let requestData = {
      socketId,
      googleDisplayName
    }

    if (socketId) {

      //match contractor socket id

      //send request to contractor
      io.emit('action', { type: 'FETCH_NEARBY_REQUESTS', payload: requestData });
      res.status(200).send({ message: 'success' });
    } else {
      io.emit('action', { type: 'NEARBY_REQUESTS_FAIL', payload: 'no active stretchologists' });
      next();
    }

    // Bookings.create(req.body)
    //   .then(savedBooking => {
    //     res.send(savedBooking);
    //   })
    //   .catch(next);

  });
}
