import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";


// Colors for the pie chart slices
const COLORS = ["#0f766e", "#2563eb", "#f59e0b", "#dc2626", "#7c3aed", "#0891b2", "#65a30d"];

function Dashboard({ expenses }) {
    const totalExpenses = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    const categoryTotals = {};

    expenses.forEach((expense) => {
        if (categoryTotals[expense.category]) {
            categoryTotals[expense.category] += Number(expense.amount);
        } else {
            categoryTotals[expense.category] = Number(expense.amount);
        }
    });

    const categoryChartData = Object.entries(categoryTotals).map(
        ([category, total]) => ({
            name: category,
            value: total
        })
    );

    return (
        <div className="dashboard">
            <h2 className="dashboard-title">Dashboard</h2>

            <div className="dashboard-grid">
                {/* Total Expenses */}
                <div className="card total-card">
                    <h3>Total Expenses</h3>
                    <p className="total-amount">Rs. {totalExpenses}</p>
                </div>

                {/* Recent Transactions */}
                <div className="card">
                    <h3>Recent Transactions</h3>

                    {expenses.length === 0 ? (
                        <p className="empty-text">No transactions yet.</p>
                    ) : (
                        <div>
                            {[...expenses]
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .slice(0, 5)
                                .map((expense) => (
                                    <div className="list-item" key={expense._id}>
                                        <div>
                                            <p className="item-title">{expense.category}</p>
                                            <p className="item-date">{expense.date}</p>
                                        </div>
                                        <p className="item-amount">Rs. {expense.amount}</p>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>

                {/* Category Summary */}
                <div className="card">
                    <h3>Category Summary</h3>

                    {Object.keys(categoryTotals).length === 0 ? (
                        <p className="empty-text">No category data yet.</p>
                    ) : (
                        <div>
                            {Object.entries(categoryTotals).map(
                                ([category, total]) => (
                                    <div className="list-item" key={category}>
                                        <p className="item-title">{category}</p>
                                        <p className="item-amount">Rs. {total}</p>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>

                {/* Expense Overview (chart) */}
                <div className="card chart-card">
                    <h3>Expense Overview</h3>

                    {categoryChartData.length === 0 ? (
                        <p className="empty-text">No expense data available for chart.</p>
                    ) : (
                        <div className="chart-box">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryChartData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius="70%"
                                        label
                                    >
                                        {categoryChartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
