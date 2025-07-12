// src/components/Sidebar.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";
import { FaHome, FaFileAlt, FaBars, FaUser, FaTimes } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { BiTargetLock } from "react-icons/bi";
import { BsClipboardData } from "react-icons/bs";

function NavItem({ icon, label, to, onClick }) {
  return (
    <Link to={to} className="nav-item" onClick={onClick}>
      <span className="nav-icon">{icon}</span>
      <span className="nav-label">{label}</span>
    </Link>
  );
}

function Sidebar() {
  const [user, setUser] = useState({
    name: localStorage.getItem("userName") || "User",
    email: localStorage.getItem("userEmail") || "user@example.com",
  });

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    axios
      .get(`http://localhost:5000/api/user/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("User fetch failed:", err));
  }, []);

  return (
    <>

      {/* Toggle (hamburger) button for small screens */}
      {!isOpen && (
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaBars size={20} />
        </button>
      )}


      {/* Sidebar Panel */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="Close-btn" onClick={toggleSidebar}>
          <FaTimes size={20} />
        </button>
        <div className="sidebar-header">
          <div className="image">
            <img src="/assets/Finance_logo.png" alt="FinanceTracker Logo" className="logo-img" />
          </div>
          <div>
            <h2>FinanceTracker</h2>
            <p>Personal Dashboard</p>
          </div>
        </div>

        <div className="nav-section">
          <NavItem icon={<FaHome />} label="Dashboard" to="/dashboard" onClick={closeSidebar} />
          <NavItem icon={<MdOutlinePayment />} label="Transactions" to="/transactions" onClick={closeSidebar} />
          <NavItem icon={<BsClipboardData />} label="Budget Planner" to="/budget_planner" onClick={closeSidebar} />
          <NavItem icon={<BiTargetLock />} label="Financial Goals" to="/financial_goals" onClick={closeSidebar} />
          <NavItem icon={<FaFileAlt />} label="Reports" to="/reports" onClick={closeSidebar} />
          <NavItem icon={<FaUser />} label="Profile" to="/profile" onClick={closeSidebar} />
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">
            <FaUser size={20} color="#fff" />
          </div>
          <div>
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
