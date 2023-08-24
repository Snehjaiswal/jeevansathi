const bcrypt = require('bcrypt');
const { User, Perents } = require('../models/User.model');
const jwt = require('jsonwebtoken');

async function signUp(req, res) {
  try {
    const { candidates_name, surname, email ,number,work,gendar,loking} = req.body;
    const {user_id,mother_name,father_name,gotra ,father_occupation,mother_occupation,sister,brother,status,city,native_city,address} = req.body
    // Check if the username or email is already registered
    const existingUser = await User.findOne({ $or: [{ candidates_name }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email is already taken.' });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      candidates_name,
      surname,
      email,
      number,
      work,
      gendar,
      loking,
      type:1
    });

    await newUser.save();
    const perents_info = new Perents({
      user_id  ,
      mother_name,
      father_name,
      gotra,
      father_occupation,
      mother_occupation,
      sister,
      brother,
      status,
      city,
      native_city,
      address,
      type:2
    })
    await perents_info.save()
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'An error occurred.' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    // if (!user) {
    //   return res.status(401).json({ message: 'Invalid email or password.' });
    // }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid || !user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Create and send JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '10d',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
};

module.exports = {
  signUp, login
};
