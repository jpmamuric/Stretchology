const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
  name: { type: String , required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  stretchologistId: { type: String, required: true },
  clientId: {type: String, required: true },
  socketId: { type: String, required: true },
  session: { type: String },
  price: { type: String },
  date: { type: String },
  time: { type: String },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('bookings', BookingSchema);
