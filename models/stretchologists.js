const mongoose = require('mongoose');
const { Schema } = mongoose;

// Subdocuments
const PointSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' }
});

const ProfileSchema = new Schema({
	firstname: { type: String },
	lastname: { type: String },
	phone: { type: String }
});

// Main Document
const StretchologistSchema = new Schema({
  stretchologistId: String,
  geometry: PointSchema,
  profile: ProfileSchema,
  socketId: { type: String, default: '' }
});

mongoose.model('stretchologists', StretchologistSchema);
