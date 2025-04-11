// ProductDetailsPage.js
import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../Components/ProductDetails/ProductDetails";

const productDB = {
    "Xiaomi 15": {
        name: "Xiaomi 15",
        price: 64999,
        mrp: 67999,
        discount: "4%",
        description:
            "The new Xiaomi 15 offers a premium flagship experience with Snapdragon 8 Gen 3, 2K AMOLED display, and a triple camera system.",
        image: "https://tse4.mm.bing.net/th?id=OIP._FX2SEZqihA7u9-3u5yfiwHaEK&pid=Api&P=0&h=180",
        offers: {
            bank: "Up to ₹3,000.00 discount on select Credit Cards",
            emi: "Up to ₹2,200.00 EMI savings on select Credit Cards",
        },
    },
    "OnePlus Nord 4": {
        name: "OnePlus Nord 4",
        price: 28998,
        mrp: 30999,
        discount: "6%",
        description:
            "Powerful performance with Snapdragon 7+ Gen 2, 120Hz AMOLED display, and fast charging in OnePlus Nord 4.",
        image: "https://tse4.mm.bing.net/th?id=OIP._FX2SEZqihA7u9-3u5yfiwHaEK&pid=Api&P=0&h=180",
        offers: {
            bank: "Up to ₹1,500.00 discount on select Credit Cards",
            emi: "Up to ₹1,800.00 EMI interest savings on select Credit Cards",
        },
    },
};

function ProductDetailsPage() {
    const { name } = useParams();
    const decodedName = decodeURIComponent(name);
    const product = productDB[decodedName];

    return (
        <div>
            {product ? (
                <ProductDetails product={product} />
            ) : (
                <h2>Product not found</h2>
            )}
        </div>
    );
}

export default ProductDetailsPage;
