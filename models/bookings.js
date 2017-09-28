const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
  name: { type: String },
  address: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  amount: { type: String },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('bookings', BookingSchema);
