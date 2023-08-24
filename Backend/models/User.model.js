const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  candidates_name: { type: String, required: true, },
  surname: { type: String, required: true, },
  email: { type: String, required: true },
  number: { type: Number },
  work: { type: String },
  gendar: { type: String },
  loking: { type: String },
  // Additional fields can be added here
});
const userPerenstSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mother_name: { type: String, required: true, },
  father_name: { type: String, required: true, },
  gotra: { type: String },
  father_occupation: { type: String },
  mother_occupation: { type: String },
  sister: { type: String },
  brother: { type: String },
  status: { type: String },
  city: { type: String },
  native_city: { type: String },
  address: { type: String },
  // Additional fields can be added here
});

const Perents = mongoose.model('perents', userPerenstSchema)
const User = mongoose.model('User', userSchema);

module.exports = { User, Perents };
