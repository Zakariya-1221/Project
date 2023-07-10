// Importing the ExpenseSchema model to interact with the MongoDB database
const IncomeSchema = require("../models/incomeModel")

// Controller function to add an income to the database
exports.addIncome = async (req,res) => {
    const {title, amount,category, description,date} = req.body

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try{
        // Validations for required fields and non-negative amount
        if (!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if (amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'All fields are required!'})
        }
        // Saving the expense to the database
        await income.save()
        res.status(200).json({message: 'Income Added'})

    } catch (error){
        return res.status(500).json({message: 'Server Error'})
    }
// Log the saved income object (will be executed after sending the response)
    console.log(income)
}
// Controller function to retrieve all income from the database
exports.getIncomes = async (req,res) => {
    try {
         // Fetching all income from the database and sorting them by creation date in descending order
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)

    } catch (error) {
        return res.status(500).json({message: 'Server Error'})
    }
}
// Controller function to delete an income from the database based on its ID
exports.deleteIncome = async (req,res) => {
   const {id} = req.params;
   console.log(req.params)
   IncomeSchema.findByIdAndDelete(id)
   .then((income) => {
     res.status(200).json({message: 'Income Deleted'})
   })
   .catch((err) =>{
    res.status(500).json({message: 'Server Error'})
   })
}
