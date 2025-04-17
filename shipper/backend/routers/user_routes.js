const express = require("express");
const router = express.Router();
const { addToCart, updateCartItem, getCartItems, removeCartItem } = require("../controllers/user_controller");

// Add item to cart
router.post("/cart/add", addToCart);

// Update quantity of item in cart
router.put("/cart/update", updateCartItem);

// Delete item from cart
router.delete("/cart/delete", removeCartItem);

// Get cart items for a user
router.get("/cart", getCartItems);

module.exports = router;