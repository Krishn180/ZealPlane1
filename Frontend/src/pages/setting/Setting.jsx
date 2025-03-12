import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Setting.scss";
import axiosInstance from "../../Auth/Axios";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const userIdLocalStorage = localStorage.getItem("Id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/${userIdLocalStorage}`
        );
        const userData = response.data.user;
        console.log("user data is", userData);

        setMobileNumber(userData.contactNumber || "");
        setAddress(userData.address || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userIdLocalStorage]);

  const handleApplyVerification = async () => {
    try {
      await axiosInstance.post("/api/verification/apply", {
        userId: userIdLocalStorage,
      });
      setVerificationStatus("Pending");
      alert("Verification request submitted!");
    } catch (error) {
      console.error("Error applying for verification:", error);
      alert("Failed to apply for verification.");
    }
  };

  const handleUpdateInfo = async () => {
    if (!mobileNumber && !address) {
      alert("Please enter at least one field to update.");
      return;
    }

    try {
      await axiosInstance.put(`/users/${userIdLocalStorage}`, {
        ...(mobileNumber && { mobileNumber }),
        ...(address && { address }),
      });
      alert("Information updated successfully!");
    } catch (error) {
      console.error("Error updating information:", error);
      alert("Failed to update information.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete("/api/user/delete-account", {
        data: { userId: userIdLocalStorage },
      });
      alert("Account deleted successfully!");
      navigate("/register");
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

      {/* Update Mobile Number & Address */}
      <div className="setting-item">
        <h3>Update Contact Info</h3>
        <label>Mobile Number:</label>
        <input
          type="text"
          placeholder="Enter new mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <label>Address:</label>
        <input
          type="text"
          placeholder="Enter new address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="update-info-btn" onClick={handleUpdateInfo}>
          Update Info
        </button>
      </div>

      {/* Delete Account */}
      <div className="setting-item">
        <h3>Delete Account</h3>
        <p>Permanently delete your account. This action cannot be undone.</p>
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
