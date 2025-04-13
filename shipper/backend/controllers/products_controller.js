const fs = require("fs");
const path = require("path");
const stringSimilarity = require("string-similarity");

const productsFile = path.join(__dirname, "../data/products_db.json");

const getAllProducts = (req, res) => {
    fs.readFile(productsFile, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Failed to load products" });

        const flatProducts = JSON.parse(data); // [{ name, price, category, ... }]
        const grouped = {};

        flatProducts.forEach((product) => {
            const cat = product.category || "Others";
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(product);
        });

        res.json(grouped);
    });
};


const getProductsByCategory = (req, res) => {
    const rawQuery = req.params.category.trim().toLowerCase();

    fs.readFile(productsFile, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Failed to load products" });

        const allProducts = JSON.parse(data);

        // Extract unique categories from product list
        const uniqueCategories = [...new Set(allProducts.map(p => p.category.trim().toLowerCase()))];

        // Find best fuzzy match for the input
        const { bestMatch } = stringSimilarity.findBestMatch(rawQuery, uniqueCategories);
        const bestCategory = bestMatch.target;
        const rating = bestMatch.rating;

        if (rating < 0.4) {
            return res.status(404).json({ error: "No close category match found" });
        }

        // Filter products that match the best fuzzy category
        const matchedProducts = allProducts.filter(
            p => p.category.trim().toLowerCase() === bestCategory
        );

        res.json({ products: matchedProducts, matchedCategory: bestCategory });
    });
};

module.exports = {
    getAllProducts,
    getProductsByCategory
};
