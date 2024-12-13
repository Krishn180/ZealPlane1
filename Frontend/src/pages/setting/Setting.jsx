import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Setting.scss";
import axiosInstance from "../../Auth/Axios";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);

  const handleApplyVerification = async () => {
    try {
      const response = await axiosInstance.post("/api/verification/apply", {
        userId: localStorage.getItem("Id"),
      });
      setVerificationStatus("Pending");
      alert("Verification request submitted!");
    } catch (error) {
      console.error("Error applying for verification:", error);
      alert("Failed to apply for verification.");
    }
  };

  const handleUpdateMobile = async () => {
    try {
      const response = await axiosInstance.put("/api/user/update-mobile", {
        userId: localStorage.getItem("Id"),
        mobileNumber,
      });
      alert("Mobile number updated successfully!");
    } catch (error) {
      console.error("Error updating mobile number:", error);
      alert("Failed to update mobile number.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.delete("/api/user/delete-account", {
        data: { userId: localStorage.getItem("Id") },
      });
      alert("Account deleted successfully!");
      navigate("/register"); // Redirect to registration page
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    alert("Logged out successfully!");
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      {/* Apply for Verification */}
      <div className="setting-item">
        <h3>Apply for Verification</h3>
        <p>
          Get a verification badge to let others know you are a verified user.
        </p>
        <button
          className="apply-verification-btn"
          onClick={handleApplyVerification}
        >
          {verificationStatus === "Pending"
            ? "Verification Pending"
            : "Apply for Verification"}
        </button>
      </div>

      {/* Update Mobile Number */}
      <div className="setting-item">
        <h3>Update Mobile Number</h3>
        <input
          type="text"
          placeholder="Enter new mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <button className="update-mobile-btn" onClick={handleUpdateMobile}>
          Update Mobile Number
        </button>
      </div>

      {/* Delete Account */}
      <div className="setting-item">
        <h3>Delete Account</h3>
        <p>
          Permanently delete your account. This action cannot be undone, and all
          your data will be removed.
        </p>
        <button className="delete-account-btn" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>

      {/* Log Out */}
      <div className="setting-item">
        <h3>Log Out</h3>
        <p>Log out from your account securely.</p>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
