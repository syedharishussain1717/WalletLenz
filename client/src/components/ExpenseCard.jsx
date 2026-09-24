function ExpenseCard({ expense, startEdit, deleteExpense }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "8px",
        width: "300px",
      }}
    >
      <h3>{expense.category}</h3>

      <p>
        <strong>Amount:</strong> Rs. {expense.amount}
      </p>

      <p>
        <strong>Description:</strong> {expense.description}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(expense.date).toLocaleDateString()}
      </p>

      <button onClick={() => startEdit(expense)}>
        Edit
      </button>

      <button onClick={() => deleteExpense(expense._id)}>
        Delete
      </button>
    </div>
  );
}

export default ExpenseCard;