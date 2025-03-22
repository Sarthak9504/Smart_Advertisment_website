import React from "react";
import "./ProductRow.css";

function ProductCard({ product }) {
    if (!product) {
        return <div className="product-card">Invalid Product</div>; // Handle missing product
    }

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <p className="product-name">{product.name}</p>
            <p className="product-price">₹{product.price}</p>
        </div>
    );
}

function ProductRow({ title, products = [] }) {
    return (
        <div className="product-row">
            <h2>{title}</h2>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                ) : (
                    <p>No products available</p> // Handle empty product list
                )}
            </div>
        </div>
    );
}

export default ProductRow;
