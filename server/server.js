const authMiddleware = require("./middleware/authMiddleware");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const expenseRoutes = require("./routes/expense");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/expenses", expenseRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("WalletLenz Backend is working!");
});

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

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });