import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductCard.css";

function ProductCard({ product }) {
    // console.log("ProductCard rendered with product:", product);
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const handleAddToCart = async (product) => {
        setAddedToCart(true);

        try {
            const res = await axios.post("/api/user/cart/add", {
                email: getUserEmailFromCookie(),
                product,
                quantity: 1,
                withCredentials: true,
            });

            if (res.status === 200) {
                setAddedToCart(true);
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
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

    const handleClick = () => {
        navigate(`/product/${encodeURIComponent(product.name)}`);
    };

    return (
        <div className="product-card" onClick={handleClick}>
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price}</p>

                {addedToCart ? (
                    <div className="cart-options">
                        <div className="cart-options">
                            <button className="quantity-btn" onClick={(e) => {
                                e.stopPropagation();
                                decreaseQuantity();
                            }}>
                                <FaTrashAlt /></button>
                            <span className="quantity">{quantity}</span>
                            <button className="quantity-btn" onClick={(e) => {
                                e.stopPropagation();
                                increaseQuantity();
                            }}>➕</button>
                        </div>
                    </div>
                ) : (
                    <button className="add-to-cart" onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                    }}>Add to Cart</button>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
