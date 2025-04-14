const fs = require("fs");
const path = require("path");
const { db } = require("./config/firebase");
const products = require("./Data/products_db.json");

async function importProducts() {
    for (const product of products) {
        try {
            const docRef = db.collection("products").doc(product.id.toString());
            await docRef.set(product);
            console.log("Uploaded product:", product.name);
        } catch (error) {
            console.error(`Error uploading ${product.name}:`, error.message);
        }
    }
    console.log("All products uploaded to Firestore!");
}

importProducts();
