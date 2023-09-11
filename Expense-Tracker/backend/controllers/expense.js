// Importing the ExpenseSchema model to interact with the MongoDB database
const ExpenseSchema = require("../models/expenseModel");

// Controller function to add an expense to the database
exports.addExpense = async (req, res) => {
  // Extracting data from the request body
  const { title, amount, category, description, date } = req.body;

  // Creating a new ExpenseSchema instance with the received data
  const income = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    // Validations for required fields and non-negative amount
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    if (amount <= 0 || !amount === 'number') {
      return res.status(400).json({ message: 'Invalid amount!' });
    }
    
    // Saving the expense to the database
    await income.save();
    res.status(200).json({ message: 'Expense Added' });
  } catch (error) {
    // Handling server errors
    return res.status(500).json({ message: 'Server Error' });
  }

  // Log the saved income object (will be executed after sending the response)
  console.log(income);
};

// Controller function to retrieve all expenses from the database
exports.getExpense = async (req, res) => {
  try {
    // Fetching all expenses from the database and sorting them by creation date in descending order
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    // Handling server errors
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to delete an expense from the database based on its ID
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  
  // Finding and deleting the expense by its ID
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: 'Expense Deleted' });
    })
    .catch((err) => {
      // Handling server errors
      res.status(500).json({ message: 'Server Error' });
    });
};
