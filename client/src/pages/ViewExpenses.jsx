import ExpenseCard from "../components/ExpenseCard";

function ViewExpenses({ expenses, startEdit, deleteExpense }) {
    return (
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
    );
}

export default ViewExpenses;