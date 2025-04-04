import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./ProductCard.css";

function ProductCard({ product }) {
    console.log("ProductCard rendered with product:", product);
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        console.log("Button clicked! Updating state...");
        setAddedToCart(true);
    };

    const increaseQuantity = () => {
        setQuantity(prevQty => prevQty + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQty => prevQty - 1);
        } else {
            setAddedToCart(false);
            setQuantity(1);
        }
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price}</p>

                {addedToCart ? (
                    <div className="cart-options">
                        <div className="cart-options">
                            <button className="quantity-btn" onClick={decreaseQuantity}>
                                <FaTrashAlt /></button>
                            <span className="quantity">{quantity}</span>
                            <button className="quantity-btn" onClick={increaseQuantity}>➕</button>
                        </div>
                    </div>
                ) : (
                    <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
