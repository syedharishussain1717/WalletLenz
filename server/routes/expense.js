const express = require("express");

const router = express.Router();

const {
    createExpense,
    getExpenses,
    updateExpense,
} = require("../controllers/expenseController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createExpense);

router.get("/", protect, getExpenses);

router.put("/:id", protect, updateExpense);

module.exports = router;