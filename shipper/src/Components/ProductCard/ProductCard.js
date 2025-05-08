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

    const handleAddToCart = async (product) => {
        setIsLoading(true);
        setAddedToCart(true);

        try {
            const res = await axios.post("http://localhost:5000/api/user/cart/add", {
                product,
                quantity: 1,

            }, {
                withCredentials: true
            });

            if (res.status === 200) {
                setAddedToCart(true);
                setQuantity(1);// Mark as added to cart
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    alert("Authentication token missing. Please sign in.");
                } else if (err.response.status === 403) {
                    alert("Invalid or expired session. Please sign in again.");
                } else {
                    alert("Failed to add to cart: " + err.response.data.message);
                }
            } else {
                console.error("Error adding to cart:", err);
                alert("Something went wrong. Please try again.");
            }
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
                productId: product.id,
                quantity: newQty,
            }, {
                withCredentials: true
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
                    productId: product.id,
                    quantity: newQty,
                }, {
                    withCredentials: true
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
                data: { productId: product.id, },
                withCredentials: true,
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

    // console.log("In the products card", product.image);

    return (
        <div className="product-card" onClick={handleClick}>
            <div className="product-image">
                <img src={`http://localhost:5000/images/${product.image}`} alt={product.name} />
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
