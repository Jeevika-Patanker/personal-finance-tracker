import React, { useEffect, useState } from "react";
import Sidebar from "../navbar";
import "./style.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchTransactions();
    fetchSummary();

  }, [filters]);

  const fetchSummary = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reports/summary", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch summary. Status: ${res.status}`);
      }

      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error("Failed to fetch summary:", err);
    }
  };

  const fetchTransactions = async () => {
    const params = new URLSearchParams();
    if (filters.type) params.append("type", filters.type);
    if (filters.category) params.append("category", filters.category);
    if (filters.startDate && filters.endDate) {
      params.append("startDate", filters.startDate);
      params.append("endDate", filters.endDate);
    }

    try {
      const res = await fetch(`http://localhost:5000/api/reports?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!res.ok) throw new Error("Failed to fetch transactions");

      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  };



  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const exportToCSV = () => {
    const csvRows = [
      ["Date", "Type", "Category", "Description", "Amount"],
      ...transactions.map(t => [
        new Date(t.date).toLocaleDateString(),
        t.type,
        t.category,
        t.description || "-",
        t.amount
      ]),
    ];
    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Transaction Report", 14, 22);

    const tableColumn = ["Date", "Type", "Category", "Description", "Amount"];
    const tableRows = transactions.map(t => [
      new Date(t.date).toLocaleDateString(),
      t.type,
      t.category,
      t.description || "-",
      `₹${t.amount.toLocaleString()}`
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("report.pdf");
  };


  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="report-page">
        <div className="report-header">
          <h1>Reports & Export</h1>
          <div className="report-btn">
            <button className="export-btn" onClick={exportToCSV}>⬇ Export CSV</button>
            <button className="export-btn" onClick={exportToPDF}>📄 Export PDF</button>
          </div>
        </div>

        <div className="filter-card">
          <h3>📊 Report Filters</h3>
          <div className="filter-grid">
            <div className="date">
              <label>Date Range</label>
              <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
              <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
            </div>
            <div>
              <label>Transaction Type</label>
              <select name="type" value={filters.type} onChange={handleChange}>
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label>Category</label>
              <input type="text" name="category" value={filters.category} onChange={handleChange} placeholder="All" />
            </div>
            <div>
              <label>Report Type</label>
              <select>
                <option value="detailed">Detailed</option>
                <option value="summary">Summary</option>
              </select>
            </div>
          </div>
        </div>

        <div className="summary-row">
          <div className="summary-box income">
            <p>Total Income</p>
            <h3>₹{summary.totalIncome || 0}</h3>
            <span>{transactions.filter(t => t.type === "income").length} transactions</span>
          </div>
          <div className="summary-box expense">
            <p>Total Expenses</p>
            <h3>₹{summary.totalExpenses || 0}</h3>
            <span>{transactions.filter(t => t.type === "expense").length} transactions</span>
          </div>
          <div className="summary-box net">
            <p>Net Amount</p>
            <h3>₹{summary.netAmount || 0}</h3>
            <span>{summary.totalTransactions || 0} total transactions</span>
          </div>
        </div>

        <div className="transactions">
          <h3>Transaction Details</h3>
          <p>Showing {transactions.length} transactions</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i}>
                  <td>{new Date(t.date).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${t.type}`}>{t.type}</span>
                  </td>
                  <td>{t.category}</td>
                  <td>{t.description}</td>
                  <td className={t.type === "income" ? "text-green" : "text-red"}>
                    ₹{t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;
