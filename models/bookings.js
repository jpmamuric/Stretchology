const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
  name: { type: String , required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  session: { type: String, required: true },
  price: { type: String, required: true  },
  stretchologistId: { type: String, required: true },
  socketId: { type: String, required: true },
  date: { type: String },
  time: { type: String },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('bookings', BookingSchema);
