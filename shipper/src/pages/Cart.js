import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "../Components/CartItems/CartItem";

const Carts = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/user/cart", {
                    withCredentials: true
                });

                const items = Object.values(response.data); // data is stored as {productId: {product}}
                setCartItems(items);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    if (loading) return <div>Loading cart...</div>;

    return (
        <div className="cart-page">
            <h2>Shopping Cart</h2>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Carts;
