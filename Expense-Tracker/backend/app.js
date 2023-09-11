// Import necessary modules
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db'); // Import the db //function
const { readdirSync } = require('fs');

const app = express(); // Create an instance of the Express application

require('dotenv').config(); // Load environment variables from .env file

const PORT = process.env.PORT; // Set the port from environment variables

// Middlewares
app.use(express.json()); // Enable parsing of JSON data in request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing to allow requests from different origins

// Routes setup
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Connect to the database using the db function from the imported module
const server = () => {
  db(); // Call the db function
  app.listen(PORT, () => {
    console.log('You are listening to port:', PORT); // Log the server's listening port once the server is running
  });
};

server(); // Start the server by calling the server function
