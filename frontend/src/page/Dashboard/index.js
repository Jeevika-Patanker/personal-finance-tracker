import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../navbar";
import "./style.css";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import { ResponsiveContainer } from 'recharts';


function Dashboard() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

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

  const totalIncome = entries
    .filter(e => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenses = entries
    .filter(e => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

  // Monthly Line/Bar Chart Data
  const chartData = entries.reduce((acc, entry) => {
    const date = new Date(entry.createdAt || entry.date);
    const month = date.toLocaleString("default", { month: "short" });

    let found = acc.find(item => item.month === month);
    if (!found) {
      found = { month, income: 0, expenses: 0 };
      acc.push(found);
    }

    if (entry.type === "income") {
      found.income += entry.amount;
    } else if (entry.type === "expense") {
      found.expenses += entry.amount;
    }

    return acc;
  }, []);

  // Pie Chart for Category
  const categoryTotals = entries
    .filter(e => e.type === "expense")
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  // const COLORS = ['#4b0082', '#6a0dad', '#a64dff', '#d1a6ff', '#e6ccff'];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="Main-container" style={{ flex: 1, padding: "20px" }}>
        <h2>Dashboard Overview</h2>

        <div className="summary-cards">
          <div className="card income">
            <p>Total Income</p>
            <h3>₹{totalIncome}</h3>
          </div>
          <div className="card expenses">
            <p>Total Expenses</p>
            <h3>₹{totalExpenses}</h3>
          </div>
          <div className="card balance">
            <p>Balance</p>
            <h3>₹{balance}</h3>
          </div>
          <div className="card savings">
            <p>Savings Rate</p>
            <h3>{savingsRate}%</h3>
          </div>
        </div>

        <div className="charts-row">
          {/* Line Chart */}
          <div className="chart-container">
            <h3>Income vs Expenses Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6ccff" />
                <XAxis dataKey="month" stroke="#6a0dad" fontSize={12} />
                <YAxis stroke="#6a0dad" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#4b0082",
                    color: "#fff",
                    borderRadius: "10px",
                    border: "none",
                  }}
                  itemStyle={{ color: "#fff" }}

                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#6a0dad"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#6a0dad" }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#a64dff"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#a64dff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="chart-container">
            <h3>Spending by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart >
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) =>
                    percent > 0.05 ? `${name} ${Math.round(percent * 100)}%` : ""
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#4b0082", "#6a0dad", "#a64dff", "#d1a6ff", "#e6ccff"][index % 5]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`₹${value}`, name]}
                  contentStyle={{
                    backgroundColor: "#6a0dad",
                    borderRadius: "10px",
                    border: "none",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="chart-container">
          <h3>Monthly Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              {/* <CartesianGrid strokeDasharray="3 3" stroke="#e6ccff" /> */}
              <XAxis dataKey="month" stroke="#4b0082" fontSize={12} />
              <YAxis stroke="#4b0082" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#4b0082",
                  color: "#fff",
                  borderRadius: 10,
                  border: "none",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend iconType="circle" />
              <Bar dataKey="income" fill="#6a0dad" barSize={28} radius={[6, 6, 0, 0]} />
              <Bar dataKey="expenses" fill="#a64dff" barSize={28} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
