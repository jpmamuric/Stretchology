const mongoose = require('mongoose');
const Booking = mongoose.model('bookings');
const User = mongoose.model('users')

module.exports = (app, io) => {
  app.get('/api/bookings', (req, res, next) => {
    console.log(req.body);
  });

  //match booking to contractor socket id
  app.get('/api/bookings/:stretchologistId', (req, res, next) => {
    const stretchologistId = req.params.stretchologistId

    Booking.find({ stretchologistId })
      .then( bookings => res.status(200).json(bookings))
      .catch(next);
  });


  app.put('/api/bookings/book/:clientId', (req, res, next) => {
    const clientId = req.params.clientId

    User.findOneAndUpdate(
      { _id: clientId },
      { $set: { isBooking: true }},
      { new: true })
        .then(data => res.status(200).send(data))
        .catch(next);
  });


  app.put('/api/bookings/cancel/:clientId', (req, res, next) => {
    const clientId = req.params.clientId

    User.findOneAndUpdate(
      { _id: clientId },
      { $set: { isBooking: false }},
      { new: true })
        .then(user => res.status(200).send(user))
        .catch(next);
  });


  app.post('/api/bookings', async (req, res, next) => {
    const { googleDisplayName, _id, address } = req.body;
    const { socketId, stretchologistId, geometry } = req.body.stretchologist;
    let name = googleDisplayName;
    let clientId = _id;
    let latitude = geometry.coordinates[1];
    let longitude = geometry.coordinates[0];
    let requestData = {
      stretchologistId,
      socketId,
      googleDisplayName
    }

    const booking = new Booking({
      name,
      latitude,
      longitude,
      stretchologistId,
      socketId,
      clientId,
      address
    })

    try {
      console.log(booking)
      // const savedBooking = await booking.save();
      res.status(200).send({ created: true });
    }
    catch (err) {
      next(err)
    }

    // Booking.create(req.body)
    //   .then(savedBooking => {
    //     res.send(savedBooking);
    //     io.emit('action', { type: 'FETCH_NEARBY_NOTIFICATION', payload: savedBooking });
    //     res.status(200).json({ message: 'success' });
    //   })
    //   .catch(next);

  });
}
