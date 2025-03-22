import React from "react";
import { useLocation } from "react-router-dom";
import SearchAdBanner from "../Components/SearchAdBanner/SearchAdBanner";
import SearchProductList from "../Components/SearchResults/SearchProductList";

const sampleProducts = [
    { name: "Xiaomi 15", price: 64999, image: "https://tse4.mm.bing.net/th?id=OIP._FX2SEZqihA7u9-3u5yfiwHaEK&pid=Api&P=0&h=180" },
    { name: "OnePlus Nord 4", price: 28998, image: "https://tse4.mm.bing.net/th?id=OIP._FX2SEZqihA7u9-3u5yfiwHaEK&pid=Api&P=0&h=180" },
];

const searchAds = {
    "smart phone": { adImage: "https://tse4.mm.bing.net/th?id=OIP._FX2SEZqihA7u9-3u5yfiwHaEK&pid=Api&P=0&h=180", adLink: "/smartphones" },
    "laptop": { adImage: "https://tse1.mm.bing.net/th?id=OIP.50IxpewLcmpKxgJGN1clGwHaEc&pid=Api&P=0&h=180", adLink: "/laptops" },
};

function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q") || "all";
    const adData = searchAds[query] || { adImage: "/images/default-ad.jpg", adLink: "/" };

    return (
        <div>
            <h2>Search Results for "{query}"</h2>
            <SearchAdBanner adImage={adData.adImage} adLink={adData.adLink} />
            <SearchProductList products={sampleProducts} />
        </div>
    );
}

export default SearchResults;
