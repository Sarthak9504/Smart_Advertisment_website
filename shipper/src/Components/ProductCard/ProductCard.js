import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
    // console.log("ProductCard rendered with product:", product);
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        console.log("Button clicked! Updating state...");
        const existingCart = document.cookie
            .split('; ')
            .find((row) => row.startsWith('cartItems='))
            ?.split('=')[1];

        let cart = [];

        if (existingCart) {
            try {
                cart = JSON.parse(decodeURIComponent(existingCart));
            } catch (error) {
                console.error("Failed to parse cart cookie", error);
            }
        }

        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1; // or skip updating if desired
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        // Save updated cart to cookies
        document.cookie = `cartItems=${encodeURIComponent(JSON.stringify(cart))}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days

        console.log("Cart cookie set:", cart);
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
                            <button className="quantity-btn" onClick={decreaseQuantity}>
                                <FaTrashAlt /></button>
                            <span className="quantity">{quantity}</span>
                            <button className="quantity-btn" onClick={increaseQuantity}>➕</button>
                        </div>
                    </div>
                ) : (
                    <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
