const Expense = require("../models/expense");

// Create a new expense
const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    // Check required fields
    if (!amount || !category || !date) {
      return res.status(400).json({
        message: "Amount, category, and date are required",
      });
    }

    // Create expense for logged-in user
    const expense = new Expense({
      user: req.user.userId,
      amount,
      category,
      description,
      date,
    });

    await expense.save();

    res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createExpense,
};