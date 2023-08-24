const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB using mongoose
mongoose.connect('mongodb+srv://sneh123:sneh123@payroll.w3xjbux.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // dbName:"ddd"
})
  .then(() => {
    console.log('Connected to MongoDB');

    // Include and use the signup route

  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
const signUpRoute = require('./routes/sing.route');
app.use('/auth', signUpRoute); // Assuming the signup route is under '/auth'
app.get('/', (req, res) => {
  res.send('hello')
})
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Other routes or middleware can be added here
