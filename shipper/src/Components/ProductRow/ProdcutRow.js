import React from "react";
import "./ProductRow.css";

function ProductCard({ product }) {
    if (!product) {
        return <div className="product-row-card">Invalid Product</div>;
    }

    return (
        <div className="product-row-card">
            <img src={product.image} alt={product.name} className="product-row-image" />
            <h3 className="product-row-name">{product.name}</h3>
            <p className="product-row-price">₹{product.price}</p>
        </div>
    );
}

function ProductRow({ title, products = [] }) {
    return (
        <div className="product-row">
            <h2 className="product-row-title">{title}</h2>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                ) : (
                    <p className="no-products">No products available</p>
                )}
            </div>
        </div>
    );
}

export default ProductRow;
