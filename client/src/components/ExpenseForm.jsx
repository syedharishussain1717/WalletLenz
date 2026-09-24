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
    <div>
      <h2>{editingId ? "Edit Expense" : "Add Expense"}</h2>

      <form onSubmit={editingId ? updateExpense : addExpense}>
        <div>
          <label>Amount:</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <br />

        <div>
          <label>Category:</label>

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>

        <br />

        <div>
          <label>Date:</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Description:</label>

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>

        <br />

        <button type="submit">
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;