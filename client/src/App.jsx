import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseCard from "./components/ExpenseCard";
import { API_URL } from "./config";
function App() {
    const [expenses, setExpenses] = useState([]);

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [editingId, setEditingId] = useState(null);
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

            const data = await response.json();

            console.log("Delete response:", data);

            if (response.ok) {
                setExpenses(
                    expenses.filter((expense) => expense._id !== id)
                );
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    const startEdit = (expense) => {
        setEditingId(expense._id);
        setAmount(expense.amount);
        setCategory(expense.category);
        setDate(expense.date.split("T")[0]);
        setDescription(expense.description);
    };

    const addExpense = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${API_URL}/api/expenses`, {
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
            });

            const data = await response.json();

            console.log("Add expense response:", data);

            if (response.ok) {
                setExpenses([...expenses, data.expense]);

                setAmount("");
                setCategory("");
                setDescription("");
                setDate("");
            }
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

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

            console.log("Update expense response:", data);

            if (response.ok) {
                setExpenses(
                    expenses.map((expense) =>
                        expense._id === editingId ? data.expense : expense
                    )
                );

                setEditingId(null);
                setAmount("");
                setCategory("");
                setDate("");
                setDescription("");
            }
        } catch (error) {
            console.error("Error updating expense:", error);
        }
    };

    useEffect(() => {
        const getExpenses = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(`${API_URL}/api/expenses`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                console.log("Expenses response:", data);

                if (response.ok) {
                    setExpenses(data);
                }
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        getExpenses();
    }, []);

    return (
        <div>
            <h1>WalletLenz</h1>
            <h2>My Expenses</h2>

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

            {expenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                <div>
                    {expenses.map((expense) => (
                        <ExpenseCard
                            key={expense._id}
                            expense={expense}
                            startEdit={startEdit}
                            deleteExpense={deleteExpense}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;