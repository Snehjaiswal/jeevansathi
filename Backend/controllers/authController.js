const bcrypt = require('bcrypt');
const { User, Perents, About } = require('../models/User.model');
const jwt = require('jsonwebtoken');


async function signUp(req, res) {
  try {
    const {
      candidates_name,
      surname,
      email,
      number,
      work,
      gendar,
      loking,
      password,
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
      height,
      education,
      family_type,
      professional,
      physically_challenge,
      about_your_future_career,
      picture
    } = req.body;

    if (status === "1") {
      const existingUser = await User.findOne({ $or: [{ candidates_name }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email is already taken.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        candidates_name,
        surname,
        email,
        password: hashedPassword,
        number,
        work,
        gendar,
        loking,
        status: "1"
      });

      await newUser.save();
      return res.status(201).json({ status: true, message: 'Added successfully.', data: 1 });
    } else if (status === "2") {
      const myquery = { email: email };
      const newvalues = {
        $set: {
          mother_name,
          father_name,
          gotra,
          father_occupation,
          mother_occupation,
          sister,
          brother,
          status: "2",
          city,
          native_city,
          address
        }
      };
      
      const updateResult = await User.updateOne(myquery, newvalues);
      console.log(updateResult.nModified + " document(s) updated");

      return res.status(201).json({ status: true, message: 'Updated successfully.', data: 2 });
    } else if (status === "3") {
      const myquery = { email: email };
      const newvalues = {
        $set: {
          height,
          education,
          family_type,
          professional,
          physically_challenge,
          about_your_future_career,
          picture,
          status: "3"
        }
      };
      
      const updateResult = await User.updateMany(myquery, newvalues);
      console.log(updateResult.nModified + " document(s) updated");

      return res.status(201).json({ status: true, message: 'Updated successfully.', data: 3 });
    } else {
      return res.status(400).json({ message: 'Invalid status.' });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'An error occurred.' });
  }
}


async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email

    // console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ message: "user is not exist" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // console.log("ooo", password, isPasswordValid);
    if (!isPasswordValid || !user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
 

    // Create and send JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '10d',
    });

    res.status(200).json({ message: 'Login successful', token,user });
  } catch (error) {
    console.error('Error during login:', error);
    console.log(error, '-------');
    res.status(500).json({ message: 'An error occurred during login.' });
  }
};

module.exports = {
  signUp, login
};
