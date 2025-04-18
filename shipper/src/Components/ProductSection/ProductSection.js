import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductSection.css";

function ProductCard({ product }) {
    const navigate = useNavigate();
    if (!product) {
        return <div className="product-row-card">Invalid Product</div>;
    }

    const handleClick = () => {
        navigate(`/product/${encodeURIComponent(product.name)}`);
    };

    console.log("In the products details", product.image);

    return (
        <div className="product-row-card" onClick={handleClick}>
            <img src={`http://localhost:5000/images/${product.image}`} alt={product.name} className="product-row-image" />
            <h3 className="product-row-name">{product.name}</h3>
            <p className="product-row-price">₹{product.price}</p>
        </div>
    );
}

function ProductSection({ title, products = [] }) {
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

export default ProductSection;