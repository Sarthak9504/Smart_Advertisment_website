const { rtdb } = require("../config/firebase");
const { addToCookieList } = require("../helpers/cookies");


exports.addToCart = async (req, res) => {
    console.log("request received");
    const email = req.user.email;
    const uuid = req.user.uuid;
    const { product, quantity } = req.body;

    if (!email || !product || !product.id) {
        return res.status(400).json({ message: "Missing required data" });
    }

    try {
        if (!uuid) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartRef = rtdb.ref(`Users/${uuid}/CartItems/${product.id}`);

        // Fetch existing quantity BEFORE using it
        const snapshot = await cartRef.once("value");
        const existing = snapshot.val();

        const newQuantity = existing ? existing.quantity + quantity : quantity;

        await cartRef.set({ ...product, quantity: newQuantity });

        addToCookieList(res, req, "ctr-cart-product-name", product.name);
        addToCookieList(res, req, "ctr-cart-product-category", product.category);

        res.status(200).json({ message: "Product added to cart", productId: product.id });
    } catch (err) {
        console.error("Add to cart error:", err);
        res.status(500).json({ message: "Error adding to cart", error: err.message });
    }
};


exports.updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    const uuid = req.user.uuid;

    if (!productId || typeof quantity !== "number") {
        return res.status(400).json({ message: "Missing required data" });
    }

    try {
        if (!uuid) return res.status(404).json({ message: "User not found" });

        const cartRef = rtdb.ref(`Users/${uuid}/CartItems/${productId}`);
        const snapshot = await cartRef.once("value");
        const productData = snapshot.val();

        if (!productData) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        const prevQuantity = productData.quantity || 0;

        if (quantity === 0) {
            await cartRef.remove();
        } else {
            await cartRef.update({ quantity });
        }

        if (quantity > prevQuantity) {
            addToCookieList(res, req, "ctr-cart_update-product-name", productData.name);
            addToCookieList(res, req, "ctr-cart_update-product-category", productData.category);
        }

        res.status(200).json({ message: "Cart updated" });
    } catch (err) {
        res.status(500).json({ message: "Error updating cart", error: err.message });
    }
};


exports.removeCartItem = async (req, res) => {
    const { productId } = req.body;
    const uuid = req.user.uuid;
    if (!productId) {
        return res.status(400).json({ message: "Missing required data" });
    }

    try {
        if (!uuid) return res.status(404).json({ message: "User not found" });

        await rtdb.ref(`Users/${uuid}/CartItems/${productId}`).remove();
        res.status(200).json({ message: "Item removed from cart" });
    } catch (err) {
        res.status(500).json({ message: "Error removing item", error: err.message });
    }
};



exports.getCartItems = async (req, res) => {
    const email = req.user.email;
    const uuid = req.user.uuid;
    if (!email) {
        return res.status(400).json({ message: "Missing email" });
    }

    try {
        if (!uuid) return res.status(404).json({ message: "User not found" });

        const snapshot = await rtdb.ref(`Users/${uuid}/CartItems`).once("value");
        const cartItems = snapshot.val() || {};
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart", error: err.message });
    }
};

