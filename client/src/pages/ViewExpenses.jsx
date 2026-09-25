import { useState } from "react";
import ExpenseCard from "../components/ExpenseCard";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function ViewExpenses({ expenses, startEdit, deleteExpense }) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // Get unique categories
    const categories = [
        "All",
        ...new Set(expenses.map((expense) => expense.category)),
    ];

    // Filter expenses
    const filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);

        const categoryMatch =
            selectedCategory === "All" ||
            expense.category === selectedCategory;

        const fromDateMatch =
            !fromDate || expenseDate >= new Date(fromDate);

        const toDateMatch =
            !toDate ||
            expenseDate <= new Date(`${toDate}T23:59:59`);

        return categoryMatch && fromDateMatch && toDateMatch;
    });

    // -------------------------
    // REPORT STATISTICS
    // -------------------------

    const totalAmount = filteredExpenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    const expenseCount = filteredExpenses.length;

    const highestExpense =
        expenseCount > 0
            ? Math.max(
                ...filteredExpenses.map(
                    (expense) => Number(expense.amount)
                )
            )
            : 0;

    const lowestExpense =
        expenseCount > 0
            ? Math.min(
                ...filteredExpenses.map(
                    (expense) => Number(expense.amount)
                )
            )
            : 0;

    const averageExpense =
        expenseCount > 0
            ? totalAmount / expenseCount
            : 0;



    // -------------------------
    // CATEGORY REPORT
    // -------------------------

    const categoryTotals = filteredExpenses.reduce(
        (totals, expense) => {
            const category = expense.category;

            if (!totals[category]) {
                totals[category] = 0;
            }

            totals[category] += Number(expense.amount);

            return totals;
        },
        {}
    );

    const categoryData = Object.entries(categoryTotals).map(
        ([category, amount]) => ({
            category,
            amount,
        })
    );


    // Clear filters
    const clearFilters = () => {
        setSelectedCategory("All");
        setFromDate("");
        setToDate("");
    };

    return (
        <div className="expenses-page">

            <h2>View Expenses</h2>

            {/* FILTERS */}
            <div className="expense-filters">

                <div>
                    <label htmlFor="category-filter">
                        Category:
                    </label>

                    <select
                        id="category-filter"
                        value={selectedCategory}
                        onChange={(e) =>
                            setSelectedCategory(e.target.value)
                        }
                    >
                        {categories.map((category) => (
                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="from-date">
                        From:
                    </label>

                    <input
                        id="from-date"
                        type="date"
                        value={fromDate}
                        onChange={(e) =>
                            setFromDate(e.target.value)
                        }
                    />
                </div>

                <div>
                    <label htmlFor="to-date">
                        To:
                    </label>

                    <input
                        id="to-date"
                        type="date"
                        value={toDate}
                        onChange={(e) =>
                            setToDate(e.target.value)
                        }
                    />
                </div>

                <button
                    type="button"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>

            </div>

            {/* REPORT */}
            <div className="expense-report">

                <h3>Expense Report</h3>

                <div className="report-grid">

                    <div className="report-card">
                        <h4>Total Amount</h4>
                        <p>Rs. {totalAmount.toFixed(2)}</p>
                    </div>

                    <div className="report-card">
                        <h4>Transactions</h4>
                        <p>{expenseCount}</p>
                    </div>

                    <div className="report-card">
                        <h4>Highest Expense</h4>
                        <p>Rs. {highestExpense.toFixed(2)}</p>
                    </div>

                    <div className="report-card">
                        <h4>Lowest Expense</h4>
                        <p>Rs. {lowestExpense.toFixed(2)}</p>
                    </div>

                    <div className="report-card">
                        <h4>Average Expense</h4>
                        <p>Rs. {averageExpense.toFixed(2)}</p>
                    </div>

                </div>

            </div>


            {/* CATEGORY CHART */}
            <div className="category-chart">

                <h3>Category Breakdown</h3>

                {categoryData.length === 0 ? (
                    <p>No data available for the chart.</p>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>

                            <Pie
                                data={categoryData}
                                dataKey="amount"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={[
                                            "#0f766e",
                                            "#2563eb",
                                            "#f59e0b",
                                            "#dc2626",
                                            "#8b5cf6",
                                            "#06b6d4",
                                            "#16a34a",
                                        ][index % 7]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value) => `Rs. ${value}`}
                            />

                            <Legend />

                        </PieChart>
                    </ResponsiveContainer>
                )}

            </div>

            {/* RESULTS */}
            <p>
                Showing {filteredExpenses.length} of{" "}
                {expenses.length} expenses
            </p>

            {filteredExpenses.length === 0 ? (
                <p>
                    No expenses found for the selected filters.
                </p>
            ) : (
                filteredExpenses.map((expense) => (
                    <ExpenseCard
                        key={expense._id}
                        expense={expense}
                        startEdit={startEdit}
                        deleteExpense={deleteExpense}
                    />
                ))
            )}

        </div>
    );
}

export default ViewExpenses;