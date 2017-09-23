const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' }
});

const ContractorSchema = new Schema({
  type: { type: String , default: 'Feature'},
  geometry: PointSchema,
  properties: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true},
    phone: { type: String, required:true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true },
    driving: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }
});

mongoose.model('contractors', ContractorSchema);
