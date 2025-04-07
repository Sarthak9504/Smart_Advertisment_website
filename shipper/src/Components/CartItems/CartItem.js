import React, { useState } from "react";
import "./CartItem.css";
import { FaTrashAlt } from "react-icons/fa";

const CartItem = ({ item }) => {
    const [quantity, setQuantity] = useState(Number(item.quantity) || 1);

    const handleIncrease = () => {
        setQuantity((prev) => Number(prev) + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => Number(prev) - 1);
        }
    };

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h3 className="cart-item-title">{item.name}</h3>
                <p className="cart-item-price">₹{item.price}</p>
                <p className="cart-item-info">{item.description}</p>
                <div className="cart-item-actions">
                    <button className="cart-item-delete">
                        <FaTrashAlt size={16} />
                    </button>
                    <div className="cart-item-quantity">
                        <button onClick={handleDecrease} className="quantity-btn">-</button>
                        <span className="quantity-value">{quantity}</span>
                        <button onClick={handleIncrease} className="quantity-btn">+</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
