import React, { useState } from "react";
import "./CartItem.css";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const CartItem = ({ item }) => {
    const [quantity, setQuantity] = useState(Number(item.quantity) || 1);

    const handleIncrease = async () => {
        try {
            const newQty = quantity + 1;
            await axios.put("/api/user/cart/update", {
                email: getUserEmailFromCookie(),
                productId: item.id,
                quantity: newQty,
                withCredentials: true,
            });
            setQuantity(newQty);
        } catch (err) {
            console.error("Error updating cart quantity:", err);
        }

        setQuantity((prev) => Number(prev) + 1);
    };

    const handleDecrease = async () => {

        try {
            const newQty = quantity - 1;
            if (newQty > 0) {
                await axios.put("/api/user/cart/update", {
                    email: getUserEmailFromCookie(),
                    productId: item.id,
                    quantity: newQty,
                    withCredentials: true,
                });
                setQuantity(newQty);
            }
        } catch (err) {
            console.error("Error updating cart quantity:", err);
        }

        if (quantity > 1) {
            setQuantity((prev) => Number(prev) - 1);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete("/api/user/cart/delete", {
                data: {
                    email: getUserEmailFromCookie(),
                    productId: item.id,
                    withCredentials: true,
                },
            });
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    };

    function getUserEmailFromCookie() {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))?.split("=")[1];

        if (!token) return null;

        try {
            const base64Payload = token.split(".")[1];
            const payload = JSON.parse(atob(base64Payload));
            return payload.email;
        } catch (err) {
            console.error("Failed to decode JWT:", err);
            return null;
        }
    }


    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h3 className="cart-item-title">{item.name}</h3>
                <p className="cart-item-price">₹{item.price}</p>
                <p className="cart-item-info">{item.description}</p>
                <div className="cart-item-actions">
                    <button className="cart-item-delete" onClick={handleDelete}>
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
