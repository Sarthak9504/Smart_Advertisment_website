import React from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import "./SearchProductList.css";

function SearchProductList({ products }) {
    return (
        <div className="search-product-list">
            {products.map((product, index) => (
                <div key={index} className="search-product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-details">
                        <h3>{product.name}</h3>
                        <p className="price">₹{product.price}</p>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SearchProductList;
