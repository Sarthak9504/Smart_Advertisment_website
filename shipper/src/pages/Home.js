import React from "react";
import AdBanner from "../Components/AdBanner/AdBanner";
import ProductRow from "../Components/ProductRow/ProdcutRow";

const adImages = [
    "https://tse3.mm.bing.net/th?id=OIP.0KwcZ4t3Czwk6BIeoaSgWAHaLf&pid=Api&P=0&h=180",
    "https://tse3.mm.bing.net/th?id=OIP.kRPeifyutUKY2BYJRwMOMwHaFQ&pid=Api&P=0&h=180",
    "https://tse2.mm.bing.net/th?id=OIP.glAuNyxylSMibkenmDiGdQHaFP&pid=Api&P=0&h=180"
];

const productsData = {
    "Clothes": [
        { name: "T-Shirt", price: 599, image: "https://tse3.mm.bing.net/th?id=OIP.PpDzwD80gFfSh1uXbu8RygHaJo&pid=Api&P=0&h=180" },
        { name: "Jeans", price: 1299, image: "https://tse3.mm.bing.net/th?id=OIP.myu0CbD3RWS0lnejimWJqwHaLH&pid=Api&P=0&h=180" },
        { name: "Jacket", price: 2499, image: "https://tse4.mm.bing.net/th?id=OIP.q_OTp4DrTguJqv0puIV_CQAAAA&pid=Api&P=0&h=180" }
    ],
    "Electronics": [
        { name: "Smartphone", price: 24999, image: "https://tse4.mm.bing.net/th?id=OIP._FX2SEZqihA7u9-3u5yfiwHaEK&pid=Api&P=0&h=180" },
        { name: "Laptop", price: 59999, image: "https://tse1.mm.bing.net/th?id=OIP.50IxpewLcmpKxgJGN1clGwHaEc&pid=Api&P=0&h=180" },
        { name: "Smartwatch", price: 9999, image: "https://sp.yimg.com/ib/th?id=OPAC.OwE76dwOdYnYvg474C474&o=5&pid=21.1&w=160&h=105" }
    ]
};

function Home() {
    return (
        <div>
            <AdBanner ads={adImages} />
            {Object.keys(productsData).map((category) => (
                <ProductRow key={category} title={category} products={productsData[category]} />
            ))}
        </div>
    );
}

export default Home;
