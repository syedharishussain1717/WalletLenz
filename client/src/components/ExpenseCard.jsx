function ExpenseCard({ expense, startEdit, deleteExpense }) {
  return (
    
    <div className="expense-card">
      <div className="expense-card-header">
        <h3 className="expense-card-category">{expense.category}</h3>
        <p className="expense-card-amount">Rs. {expense.amount}</p>
      </div>

      <p className="expense-card-description">{expense.description}</p>

      <p className="expense-card-date">
        {new Date(expense.date).toLocaleDateString()}
      </p>

      <div className="expense-card-actions">
        <button className="btn-edit" onClick={() => startEdit(expense)}>
          Edit
        </button>

        <button
          className="btn-delete"
          onClick={() => deleteExpense(expense._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseCard;
