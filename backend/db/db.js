// Importing the Mongoose library
const mongoose = require('mongoose');

// Asynchronous function to establish a connection to the MongoDB database
const db = async () => {
  try {
    // Setting 'strictQuery' to false to avoid strictness in query schema (optional)
    mongoose.set('strictQuery', false);
    
    // Establishing the connection to the MongoDB database using the MONGO_URL environment variable
    await mongoose.connect(process.env.MONGO_URL);
    
    // If the connection is successful, log a message confirming the connection
    console.log('DB Connected');
  } catch (error) {
    // If there is an error in the connection process, log the error message
    console.log('DB Connection Error:', error.message);
  }
};

// Exporting the function 'db' to make it accessible from other modules
module.exports = { db };
