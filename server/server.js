const authMiddleware = require("./middleware/authMiddleware");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const expenseRoutes = require("./routes/expense");

const app = express();

app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/expenses", expenseRoutes);

app.use("/api/auth", authRoutes);


// default backend page
app.get("/", (req, res) => {
    res.send("WalletLenz Backend is working!");
});


// for testing backend api
app.get("/api/test", (req, res) => {
    res.json({
        message: "WalletLenz API is working!"
    });
});

app.get("/api/protected", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "You have access to this protected route",
        user: req.user,
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });

module.exports = app;