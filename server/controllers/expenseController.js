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

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.userId });

        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch expenses",
            error: error.message,
        });
    }
};

const updateExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    expense.amount = amount;
    expense.category = category;
    expense.description = description;
    expense.date = date;

    await expense.save();

    res.status(200).json({
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating expense",
      error: error.message,
    });
  }
};

const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId,
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        res.status(200).json({
            message: "Expense deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting expense",
            error: error.message,
        });
    }
};
module.exports = {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
};