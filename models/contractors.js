const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' }
});

const ContractorSchema = new Schema({
  email: { type: String, required: true , unique: true },
  driving: { type: Boolean, default: false },
  geometry: PointSchema
});

mongoose.model('contractors', ContractorSchema);
