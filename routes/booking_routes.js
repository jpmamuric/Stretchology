const mongoose = require('mongoose');
const Bookings = mongoose.model('bookings');


module.exports = app => {
  app.get('/api/bookings', (req,res, next) => {
    console.log(req.body);
  });
}
