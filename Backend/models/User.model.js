const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // STATUS 1
  candidates_name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String
  },
  number: {
    type: Number,
    default:null
  },
  work: {
    type: String,
    default:null

  },
  gendar: {
    type: String,
    default:null

  },
  loking: {
    type: String,
    default:null

  },


  // STATUS 2
  father_name: {
    type: String,
    default:null

  },
  mother_name: {
    type: String,
    default:null

  },
  gotra: {
    type: String,
    default:null

  },
  father_occupation: {
    type: String,
    default:null

  },
  mother_occupation: {
    type: String,
    default:null

  },
  sister: {
    type: String,
    default:null

  },
  brother: {
    type: String,
    default:null

  },
  status: {
    type: String,
    default:null

  },
  city: {
    type: String,
    default:null

  },
  native_city: {
    type: String,
    default:null

  },
  address: {
    type: String,
    default:null

  },


  // STATUS 3
  height: {
    type: String,
    default:null

  },
  education: {
    type: String,
    default:null

  },
  family_type: {
    type: String,
    default:null

  },
  professional: {
    type: String,
    default:null

  },
  physically_challenge: {
    type: String,
    default:null

  },
  about_your_future_carrer: {
    type: String,
    default:null

  },
  picture: {
    type: String,
    default:null

  },

  status_type: {
    type: Number, default: 0
  }

});



const User = mongoose.model('User', userSchema);

module.exports = { User };
