const bcrypt = require('bcrypt');
const { User, Perents, About } = require('../models/User.model');
const jwt = require('jsonwebtoken');

async function signUp(req, res) {
  try {
    const { candidates_name, surname, email, number, work, gendar, loking, password } = req.body;
    const { user_id, mother_name, father_name, gotra, father_occupation, mother_occupation, sister, brother, status, city, native_city, address } = req.body
    const { height,
      education,
      family_type,
      professional,
      physically_challenge,
      about_your_future_carrer,
      picture } = req.body
    // Check if the username or email is already registered
    const existingUser = await User.findOne({ $or: [{ candidates_name }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email is already taken.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      candidates_name,
      surname,
      email,
      password: hashedPassword,
      number,
      work,
      gendar,
      loking,

    });

    await newUser.save();
    const perents_info = new Perents({
      user_id: newUser._id,
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

    })
    await perents_info.save()
    const about_bio = new About({
      user_id: newUser._id,
      height,
      education,
      family_type,
      professional,
      physically_challenge,
      about_your_future_carrer,
      picture,

    })
    await about_bio.save()
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

    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({message:"user is not exist"})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("ooo", password, isPasswordValid);
    if (!isPasswordValid || !user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const perenst = await Perents.findOne({ user_id: user._id })
    const about = await About.findOne({ user_id: user._id })


    // Create and send JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '10d',
    });

    res.status(200).json({ message: 'Login successful', token, user, perenst, about });
  } catch (error) {
    console.error('Error during login:', error);
    console.log(error, '-------');
    res.status(500).json({ message: 'An error occurred during login.' });
  }
};

module.exports = {
  signUp, login
};
