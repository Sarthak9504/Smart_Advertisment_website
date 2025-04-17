const { rtdb } = require("../config/firebase");

// Helper to get userId from email
const getUserUUIDByEmail = async (email) => {
    const snapshot = await rtdb.ref("Users").once("value");
    const users = snapshot.val() || {};

    for (const [uuid, user] of Object.entries(users)) {
        if (user.credentials?.email === email) {
            return uuid;
        }
    }

    return null; // Not found
};


exports.addToCart = async (req, res) => {
    // console.log("request received");
    const { email, product, quantity } = req.body;
    if (!email || !product || !product.id) {
        return res.status(400).json({ message: "Missing required data" });
    }

    try {
        // console.log("Cart ref created");
        const uuid = await getUserUUIDByEmail(email);
        if (!uuid) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartRef = rtdb.ref(`Users/${uuid}/CartItems/${product.id}`);
        const snapshot = await cartRef.once("value");
        const existing = snapshot.val();

        const newQuantity = existing ? existing.quantity + quantity : quantity;
        await cartRef.set({ ...product, quantity: newQuantity });

        res.status(200).json({ message: "Product added to cart", productId: product.id });
    } catch (err) {
        res.status(500).json({ message: "Error adding to cart", error: err.message });
    }
};

exports.updateCartItem = async (req, res) => {
    const { email, productId, quantity } = req.body;

    if (!email || !productId || typeof quantity !== "number") {
        return res.status(400).json({ message: "Missing required data" });
    }

    try {
        const uuid = await getUserUUIDByEmail(email);
        if (!uuid) return res.status(404).json({ message: "User not found" });

        const cartRef = rtdb.ref(`Users/${uuid}/CartItems/${productId}`);

        if (quantity === 0) {
            await cartRef.remove();
        } else {
            await cartRef.update({ quantity });
        }

        res.status(200).json({ message: "Cart updated" });
    } catch (err) {
        res.status(500).json({ message: "Error updating cart", error: err.message });
    }
};


exports.removeCartItem = async (req, res) => {
    const { email, productId } = req.body;

    if (!email || !productId) {
        return res.status(400).json({ message: "Missing required data" });
    }

    try {
        const uuid = await getUserUUIDByEmail(email);
        if (!uuid) return res.status(404).json({ message: "User not found" });

        await rtdb.ref(`Users/${uuid}/CartItems/${productId}`).remove();
        res.status(200).json({ message: "Item removed from cart" });
    } catch (err) {
        res.status(500).json({ message: "Error removing item", error: err.message });
    }
};



exports.getCartItems = async (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ message: "Missing email" });
    }

    try {
        const uuid = await getUserUUIDByEmail(email);
        if (!uuid) return res.status(404).json({ message: "User not found" });

        const snapshot = await rtdb.ref(`Users/${uuid}/CartItems`).once("value");
        const cartItems = snapshot.val() || {};
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart", error: err.message });
    }
};

