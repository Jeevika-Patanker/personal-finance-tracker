import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../navbar";
import "./style.css";

function Transactions() {

  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: ""
  });

  const [entries, setEntries] = useState([]);


  const [filter, setFilter] = useState({ type: "all", category: "all" });
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleAddEntry = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/dash", {
        ...form,
        amount: Number(form.amount),  //  Ensures number
        userId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchEntries();
      setForm({ type: "income", amount: "", category: "" });
    } catch (error) {
      console.error("Entry failed:", error);
    }
  };



  const fetchEntries = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`http://localhost:5000/api/dash/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(res.data);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/dash/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEntries();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredEntries = entries.filter((entry) => {
    return (
      (filter.type === "all" || entry.type === filter.type) &&
      (filter.category === "all" || entry.category === filter.category)
    );
  });

  const uniqueCategories = [...new Set(entries.map((e) => e.category))];

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="Main-container" style={{ flex: 1, padding: "20px" }}>
        <div className="header">
          <h2>Transaction Management</h2>

          <button className="add-transaction-button" onClick={() => setShowModal(true)}>
            + Add Transaction
          </button>
        </div>
        <div className="filters">
          <div className="filter-item">
            <label>Type</label>
            <select
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Category</label>
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            >
              <option value="all">All</option>
              {uniqueCategories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

        </div>

        <div className="transactions">
          <h3>Recent Transactions</h3>
          <p>Showing {filteredEntries.length} transactions</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((tx) => (
                <tr key={tx._id}>
                  <td>{new Date(tx.createdAt).toLocaleDateString()}</td>

                  <td>
                    <span className={`badge ${tx.type}`}>{tx.type}</span>
                  </td>

                  <td>{tx.category}</td>
                  <td>{tx.description || "-"}</td>

                  <td className={tx.type === "income" ? "green" : "red"}>
                    {tx.type === "income" ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                  </td>

                  <td>
                    <button onClick={() => handleDelete(tx._id)}>🗑️</button>
                  </td>
                </tr>

              ))}
              {filteredEntries.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <div className="text">
                  <h4>Add New Transaction</h4>
                  <p>Add a new income or expense transaction.</p>
                </div>

                <button className="close-btn" onClick={() => setShowModal(false)}>×</button>

              </div>

              <form onSubmit={handleAddEntry} className="entry-form">

                <label htmlFor="type">Type</label>
                <select id="type" name="type" value={form.type} onChange={handleChange}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>

                <label htmlFor="amount">Amount</label>
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="category">Category</label>
                <input
                  id="Category"
                  type="text"
                  name="category"
                  placeholder="Enter category"
                  value={form.category}
                  onChange={handleChange}
                  required
                />

                <button type="submit">Add Entry</button>
              </form>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;
