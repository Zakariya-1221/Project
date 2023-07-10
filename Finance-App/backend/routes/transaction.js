// Importing the required controllers for income and expense
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

// Importing the Express Router to handle the routes
const router = require('express').Router();

// Defining the routes for the income-related operations
router.post('/add-income', addIncome);         // POST route to add a new income
router.get('/get-incomes', getIncomes);        // GET route to fetch all incomes
router.delete('/delete-income/:id', deleteIncome);  // DELETE route to delete an income by ID

// Defining the routes for the expense-related operations
router.post('/add-expense', addExpense);       // POST route to add a new expense
router.get('/get-expenses', getExpense);       // GET route to fetch all expenses
router.delete('/delete-expense/:id', deleteExpense); // DELETE route to delete an expense by ID

// Exporting the configured router
module.exports = router;
