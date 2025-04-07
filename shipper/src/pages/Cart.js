// Carts.js (Page that lists all cart items)
import React from "react";
import CartItem from "../Components/CartItems/CartItem";

const Carts = () => {
    const cartItems = [
        {
            id: 1,
            name: "Samsung Galaxy M06 5G",
            image: "https://via.placeholder.com/150",
            price: 10698,
            originalPrice: 15499,
            discount: 31,
            size: "6GB + 128GB",
            color: "Sage Green"
        },
        {
            id: 2,
            name: "Apple iPhone 14",
            image: "https://via.placeholder.com/150",
            price: 69999,
            originalPrice: 79999,
            discount: 12,
            size: "128GB",
            color: "Blue"
        }
    ];

    return (
        <div className="cart-page">
            <h2>Shopping Cart</h2>
            {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default Carts;
