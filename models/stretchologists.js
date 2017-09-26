const mongoose = require('mongoose');
const { Schema } = mongoose;

const StretchologistSchema = new Schema({
  firstName: String,
  lastName: String,
  rating: Number,
  vehicle: {
    year: String,
    model: String,
    make: String,
    color: String
  }
});

mongoose.model('stretchologists', StretchologistSchema);
