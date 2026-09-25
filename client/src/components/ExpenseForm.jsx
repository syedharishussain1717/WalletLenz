function ExpenseForm({
  amount,
  setAmount,
  category,
  setCategory,
  date,
  setDate,
  description,
  setDescription,
  editingId,
  addExpense,
  updateExpense,
}) {
  return (
    <div className="expense-form-card">
      <h2 className="expense-form-title">
        {editingId ? "Edit Expense" : "Add Expense"}
      </h2>

      <form
        className="expense-form"
        onSubmit={editingId ? updateExpense : addExpense}
      >
        <div className="form-row">
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
        </div>

        <button className="expense-form-button" type="submit">
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
