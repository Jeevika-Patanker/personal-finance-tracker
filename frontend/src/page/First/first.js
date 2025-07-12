import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";


const First = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    setShowModal(false);
    navigate("/login");
  };

  const handleRegister = () => {
    setShowModal(false);
    navigate("/register");
  };

  return (
    <div className="landing-container">
      {/* Navbar */}

      <div className="logo">
        <div className="image">
          <img src="/assets/Finance_logo.png" alt="FinanceTracker Logo" className="logo-img" />
        </div>
        <span>FinanceTracker</span>
      </div>


      {/* Hero Section */}
      <section className="hero">
        <h1>
          Take Control of Your <span>Financial Future</span>
        </h1>
        <p>
          The most intuitive personal finance dashboard to track income, manage
          expenses, create budgets, and achieve your financial goals with
          confidence.
        </p>
        <div className="hero-buttons">
          <button className="primary" onClick={handleLogin}>
            Login
          </button>
          <button className="secondary" onClick={handleRegister}>
            Register
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Everything You Need to Manage Your Money</h2>
        <p>
          Powerful features designed to simplify your financial life and help
          you make smarter money decisions.
        </p>
        <div className="feature-grid">
          <div className="feature-card">
            💰 <strong>Income Tracking</strong>
            <p>
              Monitor all your income sources with detailed analytics and growth
              trends.
            </p>
          </div>
          <div className="feature-card">
            💸 <strong>Expense Management</strong>
            <p>
              Categorize and track expenses with smart insights and budgeting
              patterns.
            </p>
          </div>
          <div className="feature-card">
            📊 <strong>Budget Planning</strong>
            <p>Create and manage budgets with real-time tracking and alerts.</p>
          </div>
          <div className="feature-card">
            🎯 <strong>Goal Setting</strong>
            <p>
              Set financial goals and track progress with milestone
              celebrations.
            </p>
          </div>
          <div className="feature-card">
            🧠 <strong>Smart Insights</strong>
            <p>
              AI-powered recommendations to optimize your financial habits.
            </p>
          </div>
          <div className="feature-card">
            🔐 <strong>Secure & Private</strong>
            <p>
              Bank-grade encryption with complete privacy and data protection.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose">
        <div className="text">
          <h2>Why Choose FinanceTracker?</h2>
          <ul>
            <li>✅ Real-time financial insights and analytics</li>
            <li>✅ Automated expense categorization</li>
            <li>✅ AI-powered budget recommendations</li>
            <li>✅ Comprehensive financial reports</li>
            <li>✅ Mobile app with offline access</li>
          </ul>
        </div>
        <div className="dashboard-preview">
          <h3>Dashboard Preview</h3>
          <p>Get a complete overview of your financial health at a glance</p>
          <div className="preview-box">
            <div>
              <strong>Income:</strong> $3,240
            </div>
            <div>
              <strong>Expenses:</strong> $1,310
            </div>
            <div>
              <strong>Budget Left:</strong> $890
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Transform Your Financial Life?</h2>
        <p>
          Join thousands of users who have already taken control of their
          finances with FinanceTracker.
        </p>
        {/* <div className="cta-buttons">
          <button className="primary" onClick={() => setShowModal(true)}>
            Get Started Free →
          </button>
        </div> */}
        <p>Register/Login Now.</p>
      </section>

      {/* Modal */}
      {/* {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Choose an Option</h3>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )} */}

      {/* Footer */}
      {/* <footer>
        <div className="footer-content">
          <div className="logo">FinanceTracker</div>
          <div className="footer-links">
            <div>
              <h4>Product</h4>
              <ul>
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
                <li>Mobile App</li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4>Support</h4>
              <ul>
                <li>Contact</li>
                <li>FAQs</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>
       
      </footer> */}
      <p className="copyright">
        © 2025 FinanceTracker. All rights reserved.
      </p>
    </div>
  );
};

export default First;
