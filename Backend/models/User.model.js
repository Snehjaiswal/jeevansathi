const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  candidates_name: { type: String, required: true, },
  surname: { type: String, required: true, },
  email: { type: String, required: true },
  password:{type:String},
  number: { type: Number },
  work: { type: String },
  gendar: { type: String },
  loking: { type: String },
  status_type: { type: Number, default: 1 }

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
  status_type: { type: Number, default: 2 }  

});

const about_bio = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  height: { type: String },
  education: { type: String },
  family_type: { type: String },
  professional: { type: String },
  physically_challenge: { type: String },
  about_your_future_carrer: { type: String },
  picture: { type: String },
  status_type: { type: Number, default: 3 }  

})
const Perents = mongoose.model('perents', userPerenstSchema)
const User = mongoose.model('User', userSchema);
const About=mongoose.model('about',about_bio)

module.exports = { User, Perents ,About};
