const stringSimilarity = require("string-similarity");
const { db } = require("../config/firebase");
const { addToCookieList } = require("../helpers/cookies");

const getAllProducts = async (req, res) => {
    try {
        const snapshot = await db.collection("products").get();
        const flatProducts = snapshot.docs.map(doc => doc.data());

        const grouped = {};
        flatProducts.forEach(product => {
            const cat = product.category || "Others";
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(product);
        });

        res.json(grouped);
    } catch (err) {
        console.error("Firestore error:", err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

const getProductsByCategory = async (req, res) => {
    const rawQuery = req.params.category.trim().toLowerCase();

    try {
        const snapshot = await db.collection("products").get();
        const allProducts = snapshot.docs.map(doc => doc.data());

        const uniqueCategories = [...new Set(allProducts.map(p => p.category.trim().toLowerCase()))];
        const { bestMatch } = stringSimilarity.findBestMatch(rawQuery, uniqueCategories);

        const bestCategory = bestMatch.target;
        const rating = bestMatch.rating;

        if (rating < 0.4) {
            return res.status(404).json({ error: "No close category match found" });
        }

        const matchedProducts = allProducts.filter(
            p => p.category.trim().toLowerCase() === bestCategory
        );

        addToCookieList(res, req, "search-history", bestCategory);

        res.json({ products: matchedProducts, matchedCategory: bestCategory });
    } catch (err) {
        console.error("Firestore error:", err);
        res.status(500).json({ error: "Failed to fetch products by category" });
    }
};


const getProductByName = async (req, res) => {
    const name = decodeURIComponent(req.params.name).trim().toLowerCase();

    try {
        const snapshot = await db.collection("products").get();
        const products = snapshot.docs.map(doc => doc.data());

        const product = products.find(
            (p) => p.name.trim().toLowerCase() === name
        );

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        addToCookieList(res, req, "ctr-product-name", product.name);
        addToCookieList(res, req, "ctr-product-category", product.category);

        res.json(product);
    } catch (err) {
        console.error("Firestore error:", err);
        res.status(500).json({ error: "Failed to fetch product" });
    }
};

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductByName,
};
