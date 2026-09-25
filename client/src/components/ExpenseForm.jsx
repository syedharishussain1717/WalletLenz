import { useState } from "react";

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
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate amount
    if (!amount || Number(amount) <= 0) {
      setError("Please enter an amount greater than 0.");
      return;
    }

    // Validate category
    if (!category.trim()) {
      setError("Please enter a category.");
      return;
    }

    // Validate date
    if (!date) {
      setError("Please select a date.");
      return;
    }

    // Validate description
    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }

    // Clear error if everything is valid
    setError("");

    if (editingId) {
      updateExpense(e);
    } else {
      addExpense(e);
    }
  };

  return (
    <div className="expense-form-card">
      <h2 className="expense-form-title">
        {editingId ? "Edit Expense" : "Add Expense"}
      </h2>

      <form
        className="expense-form"
        onSubmit={handleSubmit}
      >
        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

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

        <button
          className="expense-form-button"
          type="submit"
        >
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;