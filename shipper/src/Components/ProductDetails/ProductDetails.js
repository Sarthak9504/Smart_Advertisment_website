// src/components/ProductDetails.js
import React from "react";
import "./ProductDetails.css";

function ProductDetails({ product }) {
    if (!product) return <div>Product not found</div>;

    console.log("In product details");
    return (
        <div className="product-details-page">
            <div className="left-section">
                <img src={product.image} alt={product.name} className="details-image" />
            </div>

            <div className="middle-section">
                <h1>{product.name}</h1>
                <p className="description">{product.description}</p>
                <div className="price-section">
                    <p className="current-price">₹{product.price.toLocaleString()}</p>
                    <p className="mrp">M.R.P: <s>₹{product.mrp.toLocaleString()}</s></p>
                    <p className="discount">- {product.discount} off</p>
                </div>
                <div className="offers">
                    <p><b>Bank Offer:</b> {product.offers.bank}</p>
                    <p><b>No Cost EMI:</b> {product.offers.emi}</p>
                </div>
            </div>

            <div className="right-section">
                <div className="buy-box">
                    <p><b>Price:</b> ₹{product.price.toLocaleString()}</p>
                    <p className="stock">In stock</p>
                    <button className="buy-btn">Buy Now</button>
                    <button className="cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
