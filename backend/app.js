const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./db/connect");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const userRoutes = require("./routes/user");
const dataRoutes = require("./routes/dash");
const goalsRoute = require("./routes/goals");
const authRoutes = require("./routes/auth");
const budgetRoutes = require("./routes/budget");
const reportsRoutes = require("./routes/reports");
const profileRoutes = require('./routes/profile');


// Use Routes
app.use("/api/user", userRoutes);
app.use("/api/dash", dataRoutes);
app.use("/api/goals", goalsRoute);
app.use("/api/auth", authRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/reports", reportsRoutes);
app.use('/api/profile', profileRoutes);



// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // This should handle mongoose.connect
    app.listen(PORT, () => {
      console.log(`✅ Server running on port: ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();