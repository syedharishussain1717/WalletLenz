const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createExpense } = require("../controllers/expenseController");

const router = express.Router();

router.post("/", authMiddleware, createExpense);

module.exports = router;