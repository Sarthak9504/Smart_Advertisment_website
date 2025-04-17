const express = require("express");
const router = express.Router();
const { addToCart, updateCartItem, getCartItems, removeCartItem } = require("../controllers/user_controller");
const authenticateUser = require("../middleware/auth_middleware");

// Add item to cart
router.post("/cart/add", authenticateUser, addToCart);

// Update quantity of item in cart
router.put("/cart/update", authenticateUser, updateCartItem);

// Delete item from cart
router.delete("/cart/delete", authenticateUser, removeCartItem);

// Get cart items for a user
router.get("/cart", authenticateUser, getCartItems);

module.exports = router;