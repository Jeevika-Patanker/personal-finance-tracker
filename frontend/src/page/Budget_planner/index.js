import Sidebar from "../navbar";
import "./style.css";
// import React, { useEffect, useState } from "react";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

function BudgetPlanner() {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({
    category: "",
    spent: 0,
    budget: 0,
    month: "",
    date: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editBudget, setEditBudget] = useState(null);

  // ✅ Get token once
  const token = localStorage.getItem("token");


  const fetchBudgets = useCallback(() => {
    axios
      .get("http://localhost:5000/api/budgets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Fetched budgets:", res.data);
        setBudgets(res.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [token]);


  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);
  

  const handleAddBudget = () => {
    const { category, budget, spent, month } = newBudget;
    if (!category || !budget || !month || spent === null || isNaN(spent)) {
      alert("Please fill all fields");
      return;
    }
    console.log("Creating budget with:", newBudget);
    console.log("Token:", token);

    axios
      .post("http://localhost:5000/api/budgets", {
        category,
        spent: Number(spent),
        budget: Number(budget),
        month
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        setNewBudget({
          category: "",
          spent: 0,
          budget: 0,
          month: "",
          date: ""
        });
        setShowModal(false);
        fetchBudgets();
      })
      .catch((err) => console.error("Error creating budget:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/budgets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => fetchBudgets())
      .catch((err) => console.error("Delete error:", err));
  };

  const handleEditClick = (budget) => {
    setEditBudget({
      ...budget,
      date: getDateValueFromMonth(budget.month),
    });
    setEditModal(true);
  };

  const handleUpdateBudget = () => {
    const { _id, category, spent, budget, month } = editBudget;
    if (!category || !budget || !month || spent === null || isNaN(spent)) {
      alert("Please fill all fields");
      return;
    }

    axios
      .put(`http://localhost:5000/api/budgets/${_id}`, {
        category,
        spent: Number(spent),
        budget: Number(budget),
        month
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        setEditModal(false);
        setEditBudget(null);
        fetchBudgets();
      })
      .catch((err) => console.error("Error updating budget:", err));
  };

  const getDateValueFromMonth = (monthStr) => {
    const [monthName, year] = monthStr.split(", ");
    const date = new Date(`${monthName} 1, ${year}`);
    const monthNum = `${date.getMonth() + 1}`.padStart(2, "0");
    return `${year}-${monthNum}`;
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalBudget - totalSpent;

  return (
    <div className="main-container">
      <Sidebar />
      <div className="planner-content">
        <div className="planner-header">
          <h2>Budget Planner</h2>
          <button className="set-budget-btn" onClick={() => setShowModal(true)}>
            + Set Budget
          </button>
        </div>

        <div className="cards-grid">
          {budgets.map((b) => {
            const usedPercent = ((b.spent / b.budget) * 100).toFixed(1);
            const remaining = b.budget - b.spent;
            let status = "";
            if (usedPercent > 100) status = "Over Budget";
            else if (usedPercent > 80) status = "Near Limit";
            else status = "On Track";

            return (
              <div className="budget-card">
                <div className="head">
                  <h3>{b.category}</h3>
                  <button className="edit-btn" onClick={() => handleEditClick(b)}>✏️</button>
                </div>


                <p>{b.month}</p>
                <div className="card-header">
                  <span>Budget: ₹{b.budget}</span>
                  <span>Spent: ₹{b.spent}</span>
                </div>


                <div className="progress-Bar">
                  <div className="progress-fill" style={{ width: `${Math.min(usedPercent, 100)}%` }}></div>
                </div>

                <div className="usage-label">
                  <span>{usedPercent}% used</span>
                  <span className="usage-tag">{status}</span>
                </div>
                <hr className="divider" />
                <div className="low">
                  <p className="remaining-label">Remaining:</p>
                  <button className="delete-btn" onClick={() => handleDelete(b._id)}>
                    🗑️
                  </button>
                </div>
                <p className="remaining-amount">₹{remaining < 0 ? 0 : remaining}</p>

                {status !== "On Track" && (
                  <div className={`status-tag ${status === "Over Budget" ? "over-budget" : ""}`}>
                    ⚠ {status === "Over Budget" ? `₹${Math.abs(remaining)} over` : "Approaching budget limit"}
                  </div>
                )}


              </div>
            );
          })}
        </div>

        <div className="summary">
          <h3>Budget Summary</h3>
          <p>Overall budget performance for the current month</p>
          <div className="summary-values">
            <span>Total Budget: ₹{totalBudget}</span>
            <span className="spent">Total Spent: ₹{totalSpent}</span>
            <span className="remaining">Remaining: ₹{totalRemaining}</span>
          </div>
        </div>
      </div>

      {editModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div className="text">
                <h4>Edit Budget</h4>
                <p className="modal-subtext">Update your budget information.</p>
              </div>
              <button className="close-btn" onClick={() => setEditModal(false)}>×</button>
            </div>

            <label>Category</label>
            <select
              value={editBudget.category}
              onChange={(e) =>
                setEditBudget({ ...editBudget, category: e.target.value })
              }
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Utilities">Utilities</option>
              <option value="Others">Others</option>
            </select>

            <label>Budget Amount</label>
            <input
              type="number"
              value={editBudget.budget}
              onChange={(e) =>
                setEditBudget({ ...editBudget, budget: Number(e.target.value) })
              }
            />

            <label>Spent Amount</label>
            <input
              type="number"
              value={editBudget.spent}
              onChange={(e) =>
                setEditBudget({ ...editBudget, spent: Number(e.target.value) })
              }
            />

            <label>Month</label>
            <input
              type="month"
              value={editBudget.date}
              onChange={(e) => {
                const [year, month] = e.target.value.split("-");
                const monthName = new Date(+year, +month - 1).toLocaleString("default", {
                  month: "long"
                });
                setEditBudget({
                  ...editBudget,
                  month: `${monthName}, ${year}`,
                  date: e.target.value
                });
              }}
            />

            <button className="modal-submit" onClick={handleUpdateBudget}>
              Update Budget
            </button>
          </div>
        </div>
      )}


      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div className="text">
                <h4>Set New Budget</h4>
                <p className="modal-subtext">Set a monthly budget for a category.</p>
              </div>

              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={newBudget.category}
              onChange={(e) =>
                setNewBudget({ ...newBudget, category: e.target.value })
              }
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Utilities">Utilities</option>
              <option value="Others">Others</option>
            </select>

            <label htmlFor="amount">Budget Amount</label>
            <input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={newBudget.budget}
              onChange={(e) =>
                setNewBudget({ ...newBudget, budget: Number(e.target.value) })
              }
            />
            {/* Spent Amount */}
            <label htmlFor="spent">Spent Amount</label>
            <input
              id="spent"
              type="number"
              placeholder="Enter spent amount"
              value={newBudget.spent}
              onChange={(e) =>
                setNewBudget({ ...newBudget, spent: Number(e.target.value) })
              }
            />

            <label htmlFor="month">Month</label>
            <input
              id="month"
              type="month"
              value={newBudget.date}
              onChange={(e) => {
                const [year, month] = e.target.value.split("-");
                const monthName = new Date(+year, +month - 1).toLocaleString("default", {
                  month: "long"
                });
                setNewBudget({
                  ...newBudget,
                  month: `${monthName}, ${year}`,
                  date: e.target.value
                });
              }}
            />

            <button className="modal-submit" onClick={handleAddBudget}>
              Set Budget
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BudgetPlanner;
