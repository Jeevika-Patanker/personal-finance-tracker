

// function FinancialGoals() {
//   const [goals, setGoals] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newGoal, setNewGoal] = useState({
//     title: "",
//     description: "",
//     target: "",
//     saved: "",
//     date: "",
//     category: "",
//     priority: "",
//   });

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/goals", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
//       .then(res => setGoals(res.data))
//       .catch(err => console.error("Failed to fetch goals:", err));

//   }, []);


//   const handleInputChange = (e) => {
//     setNewGoal({ ...newGoal, [e.target.name]: e.target.value });
//   };

//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const createGoal = () => {
//     console.log("Creating goal:", newGoal);
//     if (!newGoal.title || !newGoal.target || !newGoal.date) {
//       alert("Please fill Title, Target Amount, and Target Date");
//       return;
//     }

//     const payload = {
//       ...newGoal,
//       target: Number(newGoal.target),
//       saved: Number(newGoal.saved || 0),
//     };

//     axios.post("http://localhost:5000/api/goals", payload, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
//       .then(res => {
//         setGoals([...goals, res.data]);
//         setShowModal(false);
//         setNewGoal({
//           title: "",
//           description: "",
//           target: "",
//           saved: "",
//           date: "",
//           category: "",
//           priority: "Medium",
//         });
//       })
//       .catch(err => console.error("Failed to create goal:", err));
//   };

//   const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
//   const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);

//   return (
//     <div>

//       {/* Layout with Sidebar */}
//       <div style={{ display: "flex" }}>
//         <Sidebar />
//         <div className="financial-goals-container" style={{ flex: 1, padding: "20px" }}>
//           <div className="header">
//             <h2>Financial Goals</h2>
//             <button className="add-goal-btn" onClick={() => setShowModal(true)}>+ Add Goal</button>
//           </div>

//           <div className="goals-grid">
//             {goals.map((goal, index) => {
//               const percent = Math.min((goal.saved / goal.target) * 100, 100).toFixed(1);
//               const remaining = goal.target - goal.saved;

//               return (
//                 <div className="goal-card" key={index}>
//                   <div className="goal-header">
//                     <h3>{goal.title}</h3>
//                     <span className={`priority ${goal.priority}`}>{goal.priority}</span>
//                   </div>
//                   <p className="desc">{goal.description}</p>

//                   <div className="progress-bar">
//                     <div className="filled" style={{ width: `${percent}%` }}>
//                       ₹{goal.saved.toLocaleString()}
//                     </div>
//                   </div>

//                   <div className="goal-stats">
//                     <span>{percent}% completed</span>
//                     <span className="overdue">Overdue</span>
//                   </div>

//                   <div className="goal-footer">
//                     <div>₹ Remaining: {remaining.toLocaleString()}</div>
//                     <div>Category: <span className="tag">{goal.category}</span></div>
//                     <div>Target Date: {goal.date}</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="summary">
//             <h3>🎯 Goals Summary</h3>
//             <p>Overview of all your financial goals</p>
//             <div className="summary-values">
//               <div><strong>Total Goals:</strong> {goals.length}</div>
//               <div><strong>Completed Goals:</strong> 0</div>
//               <div><strong>Total Target Amount:</strong> ₹{totalTarget.toLocaleString()}</div>
//               <div><strong>Total Saved:</strong> ₹{totalSaved.toLocaleString()}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <div className="modal-header">
//               <div className="text">
//                 <h4>Create New Goal</h4>
//                 <p className="modal-subtext">Set a new financial goal to track your progress.</p>
//               </div>
//               <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
//             </div>

//             <label htmlFor="title">Title</label>
//             <input
//               type="text"
//               name="title"
//               id="title"
//               placeholder="Enter goal title"
//               value={newGoal.title}
//               onChange={handleInputChange}
//             />

//             <label htmlFor="description">Description</label>
//             <textarea
//               name="description"
//               id="description"
//               placeholder="Enter description"
//               value={newGoal.description}
//               onChange={handleInputChange}
//               rows={3}
//               style={{
//                 resize: "vertical",
//                 padding: "12px 14px",
//                 fontFamily: "inherit",
//                 fontSize: "14px",
//                 backgroundColor: "#f9f5ff",
//                 border: "1px solid #a64dff",
//                 borderRadius: "10px",
//                 color: "#4b0082",
//                 marginBottom: "18px"
//               }}
//             />

//             <label htmlFor="target">Target Amount</label>
//             <input
//               type="number"
//               name="target"
//               id="target"
//               placeholder="Enter target amount"
//               value={newGoal.target}
//               onChange={handleInputChange}
//             />

//             <label htmlFor="saved">Current Amount</label>
//             <input
//               type="number"
//               name="saved"
//               id="saved"
//               placeholder="Enter current amount"
//               value={newGoal.saved}
//               onChange={handleInputChange}
//             />

//             <label htmlFor="date">Target Date</label>
//             <input
//               type="text"
//               name="date"
//               id="date"
//               placeholder="dd-mm-yyyy"
//               value={newGoal.date}
//               onChange={handleInputChange}
//             />

//             <label htmlFor="category">Category</label>
//             <input
//               type="text"
//               name="category"
//               id="Category"
//               placeholder="e.g. Travel, Education, etc."
//               value={newGoal.category}
//               onChange={handleInputChange}
//             />

//             <label htmlFor="priority">Priority</label>
//             <select
//               name="priority"
//               id="priority"
//               value={newGoal.priority}
//               onChange={handleInputChange}
//             >
//               <option value="">Select priority</option>
//               <option value="High">High</option>
//               <option value="Medium">Medium</option>
//               <option value="Low">Low</option>
//             </select>

//             <button className="modal-submit" onClick={createGoal}>Create Goal</button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default FinancialGoals;



import Sidebar from "../navbar";
import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function FinancialGoals() {
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    target: "",
    saved: "",
    date: "",
    category: "",
    priority: "Medium",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/goals", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => setGoals(res.data))
      .catch(err => console.error("Failed to fetch goals:", err));
  }, []);

  const handleInputChange = (e) => {
    setNewGoal({ ...newGoal, [e.target.name]: e.target.value });
  };

  const saveGoal = () => {
    if (!newGoal.title || !newGoal.target || !newGoal.date) {
      alert("Please fill Title, Target Amount, and Target Date");
      return;
    }

    const payload = {
      ...newGoal,
      target: Number(newGoal.target),
      saved: Number(newGoal.saved || 0),
    };

    const url = isEditing
      ? `http://localhost:5000/api/goals/${editId}`
      : "http://localhost:5000/api/goals";

    const method = isEditing ? axios.put : axios.post;

    method(url, payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(res => {
        if (isEditing) {
          setGoals(goals.map(goal => (goal._id === editId ? res.data : goal)));
        } else {
          setGoals([...goals, res.data]);
        }

        setShowModal(false);
        setIsEditing(false);
        setEditId(null);
        resetForm();
      })
      .catch(err => console.error("Failed to save goal:", err));
  };

  const resetForm = () => {
    setNewGoal({
      title: "",
      description: "",
      target: "",
      saved: "",
      date: "",
      category: "",
      priority: "Medium",
    });
  };

  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);

  return (
    <div>
      {/* Layout with Sidebar */}
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="financial-goals-container" style={{ flex: 1, padding: "20px" }}>
          <div className="header">
            <h2>Financial Goals</h2>
            <button className="add-goal-btn" onClick={() => {
              resetForm();
              setShowModal(true);
              setIsEditing(false);
              setEditId(null);
            }}>
              + Add Goal
            </button>
          </div>

          <div className="goals-grid">
            {goals.map((goal, index) => {
              const percent = Math.min((goal.saved / goal.target) * 100, 100).toFixed(1);
              const remaining = goal.target - goal.saved;

              return (
                <div className="goal-card" key={index}>
                  <div className="goal-header">
                    <h3>{goal.title}</h3>
                    <span className={`priority ${goal.priority}`}>{goal.priority}</span>
                  </div>
                  <p className="desc">{goal.description}</p>

                  <div className="progress-bar">
                    <div className="filled" style={{ width: `${percent}%` }}>
                      ₹{goal.saved.toLocaleString()}
                    </div>
                  </div>

                  <div className="goal-stats">
                    <span>{percent}% completed</span>
                    <span className="overdue">Overdue</span>
                  </div>

                  <div className="goal-footer">
                    <div>₹ Remaining: {remaining.toLocaleString()}</div>
                    <div>Category: <span className="tag">{goal.category}</span></div>
                    <div>Target Date: {goal.date}</div>
                  </div>

                  <button
                    className="Edit-btn"
                    onClick={() => {
                      setShowModal(true);
                      setIsEditing(true);
                      setEditId(goal._id);
                      setNewGoal({
                        title: goal.title,
                        description: goal.description,
                        target: goal.target,
                        saved: goal.saved,
                        date: goal.date,
                        category: goal.category,
                        priority: goal.priority || "Medium",
                      });
                    }}
                  >
                    ✏️ 
                  </button>
                </div>
              );
            })}
          </div>

          <div className="summary">
            <h3>🎯 Goals Summary</h3>
            <p>Overview of all your financial goals</p>
            <div className="summary-values">
              <div><strong>Total Goals:</strong> {goals.length}</div>
              <div><strong>Completed Goals:</strong> 0</div>
              <div><strong>Total Target Amount:</strong> ₹{totalTarget.toLocaleString()}</div>
              <div><strong>Total Saved:</strong> ₹{totalSaved.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div className="text">
                <h4>{isEditing ? "Edit Goal" : "Create New Goal"}</h4>
                <p className="modal-subtext">Set a financial goal to track progress.</p>
              </div>
              <button className="close-btn" onClick={() => {
                setShowModal(false);
                setIsEditing(false);
                setEditId(null);
                resetForm();
              }}>
                ×
              </button>
            </div>

            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter goal title"
              value={newGoal.title}
              onChange={handleInputChange}
            />

            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter description"
              value={newGoal.description}
              onChange={handleInputChange}
              rows={3}
              style={{
                resize: "vertical",
                padding: "12px 14px",
                fontFamily: "inherit",
                fontSize: "14px",
                backgroundColor: "#f9f5ff",
                border: "1px solid #a64dff",
                borderRadius: "10px",
                color: "#4b0082",
                marginBottom: "18px"
              }}

            />

            <label htmlFor="target">Target Amount</label>
            <input
              type="number"
              name="target"
              id="target"
              placeholder="Enter target amount"
              value={newGoal.target}
              onChange={handleInputChange}
            />

            <label htmlFor="saved">Current Amount</label>
            <input
              type="number"
              name="saved"
              id="saved"
              placeholder="Enter current amount"
              value={newGoal.saved}
              onChange={handleInputChange}
            />

            <label htmlFor="date">Target Date</label>
            <input
              type="text"
              name="date"
              id="date"
              placeholder="dd-mm-yyyy"
              value={newGoal.date}
              onChange={handleInputChange}
            />

            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="e.g. Travel, Education, etc."
              value={newGoal.category}
              onChange={handleInputChange}
            />

            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              id="priority"
              value={newGoal.priority}
              onChange={handleInputChange}
            >
              <option value="">Select priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button className="modal-submit" onClick={saveGoal}>
              {isEditing ? "Update Goal" : "Create Goal"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinancialGoals;
