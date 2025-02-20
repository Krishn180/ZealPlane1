import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../Auth/Axios";
import "./Checkout.scss";

const Checkout = () => {
  const location = useLocation();
  const { product } = location.state || {}; // Keep product data from state

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("Id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {}; // No token in headers if not available

        const response = await axiosInstance.get(`users/${userId}`, {
          headers,
        });
        console.log("User data is:", response.data.user);
        setUser(response.data.user);
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
        console.log("Errors are:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (!product) return <p>No product data found!</p>;
  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>{error}</p>;

  // Check if user data is updated
  const isUserUpdated =
    user?.fullName && user?.address && user?.points !== undefined;
  const discount = user?.points || 0;

  return (
    <div className="checkout-container">
      {/* <h1>Checkout</h1> */}
      <div className="checkout-details">
        <h3>Product Title: {product.title}</h3>
        <p>Category: {product.category}</p>
        <p>Price: ₹{product.price}</p>
        <img
          src={product.image}
          alt={product.title}
          className="checkout-product-image"
        />

        <div className="user-info">
          <h4>User Information</h4>
          <p>
            <strong>Name:</strong> {user?.fullName || "Not updated"}
          </p>
          <p>
            <strong>Address:</strong> {user?.address || "Not updated"}
          </p>
          <p>
            <strong>Points Earned:</strong> {user?.points ?? "Not updated"}
          </p>
          <p>
            <strong>Discount Available:</strong> ₹{discount}
          </p>
        </div>

        <button
          className="confirm-purchase-button"
          disabled={!isUserUpdated} // Disable button if user data is not updated
          style={{
            backgroundColor: isUserUpdated ? "#FF5733" : "gray",
            cursor: isUserUpdated ? "pointer" : "not-allowed",
          }}
        >
          Confirm Purchase
        </button>

        {!isUserUpdated && (
          <p className="error-message">
            Please update your user information to proceed.
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
