import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductCard.css";

function ProductCard({ product }) {
    // console.log("ProductCard rendered with product:", product);
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);  // Loading state for better UX
    const navigate = useNavigate();

    const getUserEmailFromCookie = () => {
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
    };

    const handleAddToCart = async (product) => {
        setIsLoading(true);
        setAddedToCart(true);

        try {
            const res = await axios.post("http://localhost:5000/api/user/cart/add", {
                email: getUserEmailFromCookie(),
                product,
                quantity: 1,
                withCredentials: true,
            });

            if (res.status === 200) {
                setAddedToCart(true);
                setQuantity(1);// Mark as added to cart
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const handleIncrease = async () => {
        if (isLoading) return;  // Prevent duplicate requests while loading

        setIsLoading(true);
        const newQty = quantity + 1;

        try {
            await axios.put("http://localhost:5000/api/user/cart/update", {
                email: getUserEmailFromCookie(),
                productId: product.id,
                quantity: newQty,
                withCredentials: true,
            });
            setQuantity(newQty);
        } catch (err) {
            console.error("Error updating cart quantity:", err);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const handleDecrease = async () => {
        if (isLoading) return;  // Prevent duplicate requests while loading

        setIsLoading(true);
        const newQty = quantity - 1;

        try {
            if (newQty > 0) {
                await axios.put("http://localhost:5000/api/user/cart/update", {
                    email: getUserEmailFromCookie(),
                    productId: product.id,
                    quantity: newQty,
                    withCredentials: true,
                });
                setQuantity(newQty);
            } else {
                await handleDelete();  // Delete the item if quantity reaches 0
            }
        } catch (err) {
            console.error("Error updating cart quantity:", err);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const handleDelete = async () => {
        if (isLoading) return;  // Prevent duplicate requests while loading

        setIsLoading(true);

        try {
            await axios.delete("http://localhost:5000/api/user/cart/delete", {
                data: {
                    email: getUserEmailFromCookie(),
                    productId: product.id,
                    withCredentials: true,
                },
            });
            setQuantity(0);
            setAddedToCart(false);// Reset quantity to 0 after deletion
        } catch (err) {
            console.error("Error deleting item:", err);
        } finally {
            setIsLoading(false); // Reset loading state
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
                                handleDecrease();
                            }}>
                                <FaTrashAlt /></button>
                            <span className="quantity">{quantity}</span>
                            <button className="quantity-btn" onClick={(e) => {
                                e.stopPropagation();
                                handleIncrease();
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
