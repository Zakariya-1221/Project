// Importing the Mongoose library
const mongoose = require('mongoose');

// Creating a new Mongoose schema called ExpenseSchema
const ExpenseSchema = new mongoose.Schema({
  // Defining the "title" field in the schema
  title: {
    type: String,
    required: true,      // The field is required and must be present in the document
    trim: true,          // Trims any whitespace from the beginning and end of the string
    maxLength: 50        // Specifies the maximum length allowed for this field (50 characters)
  },
  // Defining the "amount" field in the schema
  amount: {
    type: Number,
    required: true,      // The field is required and must be present in the document
    maxLength: 20,       // Specifies the maximum length allowed for this field (20 characters)
    trim: true           // Trims any whitespace from the beginning and end of the string
  },
  // Defining the "type" field in the schema
  type: {
    type: String,
    default: "expense"   // Sets a default value of "expense" if the field is not provided
  },
  // Defining the "date" field in the schema
  date: {
    type: Date,
    required: true,      // The field is required and must be present in the document
    trim: true           // Trims any whitespace from the beginning and end of the string
  },
  // Defining the "category" field in the schema
  category: {
    type: String,
    required: true,      // The field is required and must be present in the document
    maxLength: 20,       // Specifies the maximum length allowed for this field (20 characters)
    trim: true           // Trims any whitespace from the beginning and end of the string
  },
  // Defining the "description" field in the schema
  description: {
    type: String,
    required: true,      // The field is required and must be present in the document
    maxLength: 20,       // Specifies the maximum length allowed for this field (20 characters)
    trim: true           // Trims any whitespace from the beginning and end of the string
  }
}, { timestamps: true }); // Enables automatic timestamps for createdAt and updatedAt fields

// Creating and exporting a Mongoose model named "Expense" using the ExpenseSchema
module.exports = mongoose.model('Expense', ExpenseSchema);
