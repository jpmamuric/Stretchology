const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  googleDisplayName: String,
  googleFirstName: String,
  googleEmail: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  credits: { type: Number, default: 0 },
  contractor: { type: Boolean, default: false }
});

mongoose.model('users', userSchema);
