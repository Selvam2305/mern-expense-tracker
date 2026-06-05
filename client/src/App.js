import { useEffect, useState } from "react";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "./api/transaction";

import ExpenseChart from "./components/ExpenseChart";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);

  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "other",
  });

  // LOAD DATA
  const loadData = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD TRANSACTION (SAFE ORIGINAL VERSION)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTransaction({
        title: form.title,
        amount: Number(form.amount),
        type: form.type,
        category: form.category,
      });

      setForm({
        title: "",
        amount: "",
        type: "expense",
        category: "other",
      });

      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  // MONTH FILTER (SAFE)
  const filteredTransactions = transactions.filter((t) => {
    if (!t.date) return true; // allows old data
    const d = new Date(t.date);
    return d.getMonth() + 1 === Number(month);
  });

  // INCOME
  const income = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  // EXPENSE
  const expense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const balance = income - expense;

  return (
    <div className="app">
      <h1 className="title">💰 Expense Tracker</h1>

      {/* MONTH SELECT */}
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      {/* DASHBOARD */}
      <div className="dashboard">
        <div className="card balance">
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>

        <div className="card income">
          <h3>Income</h3>
          <p>₹{income}</p>
        </div>

        <div className="card expense">
          <h3>Expense</h3>
          <p>₹{expense}</p>
        </div>
      </div>

      {/* CHART (ONLY ONE - ORIGINAL) */}
      <ExpenseChart income={income} expense={expense} />

      {/* FORM */}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <select name="type" value={form.type} onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <select name="category" value={form.category} onChange={handleChange}>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="rent">Rent</option>
          <option value="salary">Salary</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">Add Transaction</button>
      </form>

      {/* LIST */}
      <div className="list">
        {filteredTransactions.map((t) => (
          <div key={t._id} className={`item ${t.type}`}>
            <div>
              <h4>{t.title}</h4>
              <p>
                ₹{t.amount} • {t.category}
              </p>
            </div>

            <button onClick={() => handleDelete(t._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;