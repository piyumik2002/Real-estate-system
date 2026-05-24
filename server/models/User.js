const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // මේක තමයි වැදගත්ම දේ
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);