import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../navbar";
import "./style.css";

function Profile() {
  const userId = localStorage.getItem("userId");
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/profile/${userId}`)
      .then(res => {
        setProfile(res.data);
        setEditProfile(res.data);
      })
      .catch(err => console.error("Error loading profile", err));
  }, [userId]);

  const handleChange = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/api/profile/${userId}`, editProfile)
      .then(res => {
        setProfile(res.data);
        setEditProfile(res.data);
        setIsEditing(false);
      })
      .catch(err => console.error("Error saving profile", err));
  };
  const handleCancel = () => {
    setEditProfile(profile);  // discard changes
    setIsEditing(false);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <Sidebar />
      <div className="profile-content">
        <h2>Profile & Settings</h2>

        {/* Profile Info */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar-circle">👤</div>
            <div className="short-details">
              <h3>{profile.firstName} {profile.lastName}</h3>
              <p>{profile.email}</p>
              <span className="joined">Joined {new Date(profile.joinedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="section">
            <h4>Personal Information</h4>

            <div className="field-row">
              <div className="field">
                <label>First Name</label>
                <input
                  name="firstName"
                  placeholder="Enter your first name"
                  value={editProfile.firstName || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Last Name</label>
                <input
                  name="lastName"
                  placeholder="Enter your last name"
                  value={editProfile.lastName || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={editProfile.email || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Phone</label>
                <input
                  name="phone"
                  placeholder="Enter your phone number"
                  value={editProfile.phone || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={editProfile.dob || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label>Bio</label>
              <textarea
                name="bio"
                placeholder="Tell us something about yourself"
                value={editProfile.bio || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="section">
            <h4>Address Information</h4>

            <div className="field-row">
              <div className="field">
                <label>Street</label>
                <input
                  name="street"
                  placeholder="Enter your street address"
                  value={editProfile.street || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label>City</label>
                <input
                  name="city"
                  placeholder="Enter your city"
                  value={editProfile.city || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Country</label>
                <input
                  name="country"
                  placeholder="Enter your country"
                  value={editProfile.country || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>




          <div className="button-row">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            ) : (
              <>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSave}>Save Changes</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
