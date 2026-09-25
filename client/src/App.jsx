import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
// Components
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseCard from "./components/ExpenseCard";

// Pages
import Login from "./pages/Login";

import { API_URL } from "./config";

function App() {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [editingId, setEditingId] = useState(null);

    // -------------------------
    // GET EXPENSES
    // -------------------------
    useEffect(() => {
        const getExpenses = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

            try {
                const response = await fetch(
                    `${API_URL}/api/expenses`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setExpenses(data);
                }
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        getExpenses();
    }, []);

    // -------------------------
    // ADD EXPENSE
    // -------------------------
    const addExpense = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `${API_URL}/api/expenses`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        amount,
                        category,
                        date,
                        description,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setExpenses([...expenses, data.expense]);

                clearForm();
            }
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    // -------------------------
    // DELETE EXPENSE
    // -------------------------
    const deleteExpense = async (id) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `${API_URL}/api/expenses/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                setExpenses(
                    expenses.filter(
                        (expense) => expense._id !== id
                    )
                );
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    // -------------------------
    // START EDIT
    // -------------------------
    const startEdit = (expense) => {

        setEditingId(expense._id);
        setAmount(expense.amount);
        setCategory(expense.category);
        setDescription(expense.description);
        setDate(expense.date.split("T")[0]);

        navigate("/add-expense");

    };

    // -------------------------
    // UPDATE EXPENSE
    // -------------------------
    const updateExpense = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `${API_URL}/api/expenses/${editingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        amount,
                        category,
                        date,
                        description,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setExpenses(
                    expenses.map((expense) =>
                        expense._id === editingId
                            ? data.expense
                            : expense
                    )
                );

                clearForm();
                setEditingId(null);
            }
        } catch (error) {
            console.error("Error updating expense:", error);
        }
    };

    // -------------------------
    // CLEAR FORM
    // -------------------------
    const clearForm = () => {
        setAmount("");
        setCategory("");
        setDescription("");
        setDate("");
    };

    // -------------------------
    // LOGOUT
    // -------------------------
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    // -------------------------
    // PROTECTED PAGE
    // -------------------------
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <>
            {isLoggedIn && <Navbar logout={logout} />}

            <Routes>
                {/* Login */}
                <Route
                    path="/login"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/dashboard" />
                        ) : (
                            <Login />
                        )
                    }
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn ? (
                            <Dashboard expenses={expenses} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* Add Expense */}
                <Route
                    path="/add-expense"
                    element={
                        isLoggedIn ? (
                            <ExpenseForm
                                amount={amount}
                                setAmount={setAmount}
                                category={category}
                                setCategory={setCategory}
                                date={date}
                                setDate={setDate}
                                description={description}
                                setDescription={setDescription}
                                editingId={editingId}
                                addExpense={addExpense}
                                updateExpense={updateExpense}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* View Expenses */}
                <Route
                    path="/expenses"
                    element={
                        isLoggedIn ? (
                            <div>
                                {expenses.length === 0 ? (
                                    <p>No expenses found.</p>
                                ) : (
                                    expenses.map((expense) => (
                                        <ExpenseCard
                                            key={expense._id}
                                            expense={expense}
                                            startEdit={startEdit}
                                            deleteExpense={deleteExpense}
                                        />
                                    ))
                                )}
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* Default route */}
                <Route
                    path="/"
                    element={
                        <Navigate
                            to={
                                isLoggedIn
                                    ? "/dashboard"
                                    : "/login"
                            }
                        />
                    }
                />

                {/* Unknown route */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to={
                                isLoggedIn
                                    ? "/dashboard"
                                    : "/login"
                            }
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;