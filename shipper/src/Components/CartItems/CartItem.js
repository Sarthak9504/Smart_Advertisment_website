import React, { useState } from "react";
import "./CartItem.css";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const CartItem = ({ item }) => {
    const [quantity, setQuantity] = useState(Number(item.quantity) || 1);

    const handleIncrease = async () => {
        try {
            const newQty = quantity + 1;
            await axios.put("http://localhost:5000/api/user/cart/update", {
                productId: item.id,
                quantity: newQty,
            }, {
                withCredentials: true
            });
            setQuantity(newQty);
        } catch (err) {
            console.error("Error updating cart quantity:", err);
        }

    };

    const handleDecrease = async () => {

        try {
            const newQty = quantity - 1;
            if (newQty > 0) {
                await axios.put("http://localhost:5000/api/user/cart/update", {
                    productId: item.id,
                    quantity: newQty,
                }, {
                    withCredentials: true
                });
                setQuantity(newQty);
            }
        } catch (err) {
            console.error("Error updating cart quantity:", err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete("http://localhost:5000/api/user/cart/delete", {
                data: { productId: item.id, },
                withCredentials: true,
            });
        } catch (err) {
            console.error("Error deleting item:", err);
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
