// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import First from "./page/First/first";
import Login from "./page/First/login";
import Register from "./page/First/register";
import Dashboard from "./page/Dashboard";
import Transactions from "./page/Transcations";
import BudgetPlanner from "./page/Budget_planner";
import FinancialGoals from "./page/Financial_Goals";
import Reports from "./page/Reports";
import Profile from "./page/profile"

import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budget_planner" element={<BudgetPlanner />} />
        <Route path="/financial_goals" element={<FinancialGoals />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
