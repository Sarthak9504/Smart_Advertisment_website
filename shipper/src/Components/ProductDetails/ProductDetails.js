// src/components/ProductDetails.js
import React, { useState } from "react";
import axios from "axios";
import "./ProductDetails.css";

function ProductDetails({ product }) {
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/cart/add",
        {
          product,
          quantity: 1,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setAddedToCart(true);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          alert("Authentication token missing. Please sign in.");
        } else if (err.response.status === 403) {
          alert("Invalid or expired session. Please sign in again.");
        } else {
          alert("Failed to add to cart: " + err.response.data.message);
        }
      } else {
        console.error("Error adding to cart:", err);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="product-details-page">
      <div className="left-section">
        <img
          src={`http://localhost:5000/images/${product.image}`}
          alt={product.name}
          className="details-image"
        />
      </div>

      <div className="middle-section">
        <h1>{product.name}</h1>
        <p className="description">{product.description}</p>
        <div className="price-section">
          <p className="current-price">₹{product.price.toLocaleString()}</p>
        </div>
      </div>

      <div className="right-section">
        <div className="buy-box">
          <p>
            <b>Price:</b> ₹{product.price.toLocaleString()}
          </p>
          <p className="stock">In stock</p>
          <button className="buy-btn">Buy Now</button>
          <button
            className={`cart-btn ${addedToCart ? "added" : ""}`}
            onClick={handleAddToCart}
            disabled={addedToCart}
          >
            {addedToCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
