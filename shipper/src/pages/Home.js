import React, { useEffect, useState } from "react";
import AdBanner from "../Components/AdBanner/AdBanner";
import ProductSection from "../Components/ProductSection/ProductSection";

const adImages = [
    "https://tse3.mm.bing.net/th?id=OIP.0KwcZ4t3Czwk6BIeoaSgWAHaLf&pid=Api&P=0&h=180",
    "https://tse3.mm.bing.net/th?id=OIP.kRPeifyutUKY2BYJRwMOMwHaFQ&pid=Api&P=0&h=180",
    "https://tse2.mm.bing.net/th?id=OIP.glAuNyxylSMibkenmDiGdQHaFP&pid=Api&P=0&h=180"
];

function Home() {
    const [productsData, setProductsData] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products");
                const data = await res.json();
                setProductsData(data);
                console.log(data['laptop']);
            } catch (err) {
                console.error("Failed to fetch products", err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <AdBanner ads={adImages} />
            {Object.keys(productsData).map((category) => (
                <ProductSection key={category} title={category} products={productsData[category]} />
            ))}
        </div>
    );
}

export default Home;
