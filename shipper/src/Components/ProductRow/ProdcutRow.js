import React from "react";
import "./ProductRow.css";

function ProductCard({ product }) {
    if (!product) {
        return <div className="product-card">Invalid Product</div>;
    }

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p>
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
