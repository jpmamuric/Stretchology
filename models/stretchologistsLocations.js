const mongoose = require('mongoose');
const { Schema } = mongoose;

const StretchologistLocationSchema = new Schema({
  StretchologistId: String,
  geometry: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [ Number ], index: '2dshpere' }
  },
  socketId: { type: String, default: '' }
});

mongoose.model('stretchologistsLocations', StretchologistLocationSchema);
