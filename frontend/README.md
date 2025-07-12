
# 💰 Personal Financial Dashboard

![License](https://img.shields.io/badge/License-MIT-green.svg)
![MERN](https://img.shields.io/badge/Stack-MERN-blue)

A full-stack personal finance management platform built with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. This application helps users **track income, expenses, set budgets, define goals, and generate financial reports** with intuitive visualizations and secure authentication.

---
## 📺 Demo

[![Watch the demo](https://img.youtube.com/vi/30FYGfqka7o/hqdefault.jpg)](https://www.youtube.com/watch?v=30FYGfqka7o&t=28s)

---

## 📌 Features

### 🔐 User Authentication
- JWT-based sign up and login
- Secure password hashing
- Profile management and session handling

### 📊 Dashboard Overview
- Displays total income, expenses, and balance
- Interactive data visualizations (Line, Bar, Pie charts)

### 💸 Transactions
- Add, edit, delete, and view transactions
- Categorize by type (e.g. food, rent, salary)
- Mark recurring transactions

### 🧾 Budget Planner
- Set monthly category budgets
- Real-time tracking with visual **progress bars**
- Alert for overspending

### 🎯 Goals Tracker
- Create and track custom financial goals
- Progress tracking and completion status

### 📈 Reports & Export
- View filtered/sorted financial reports
- Export data to **CSV** and **PDF**
- Printable report formats


---

## 🛠️ Tech Stack

| Frontend      | Backend         | Database     | Other Tools              |
| ------------- | --------------- | ------------ | ------------------------ |
| React.js      | Node.js         | MongoDB      | JWT, Chart.js / Recharts |
| React Router  | Express.js      | Mongoose     | Axios, Multer (optional) |

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

---

### 🔧 Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/finance-dashboard.git
   cd finance-dashboard
   \`\`\`

2. **Backend Setup**
   \`\`\`bash
   cd backend
   npm install
   npm run dev
   \`\`\`

3. **Frontend Setup**
   \`\`\`bash
   cd ../frontend
   npm install
   npm start
   \`\`\`

---

### 🔐 Environment Variables

Create a \`.env\` file inside the \`backend\` directory:

\`\`\`env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
\`\`\`

---


## 📁 Project Structure

\`\`\`
finance-dashboard/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── app.js
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── .gitignore
├── README.md
\`\`\`

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## ✍️ Author

**Jeevika Patanker**  
Built with ❤️ using the MERN stack.

