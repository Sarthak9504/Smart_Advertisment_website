import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SearchAdBanner from "../Components/SearchAdBanner/SearchAdBanner";
import SearchProductList from "../Components/SearchResults/SearchProductList";

const sampleProducts = [
    { id: 1, name: "Xiaomi 15", price: 64999, image: "https://tse4.mm.bing.net/th?id=OIP._FX2SEZqihA7u9-3u5yfiwHaEK&pid=Api&P=0&h=180" },
    { id: 2, name: "OnePlus Nord 4", price: 28998, image: "https://tse4.mm.bing.net/th?id=OIP._FX2SEZqihA7u9-3u5yfiwHaEK&pid=Api&P=0&h=180" },
];

const searchAds = {
    "smart phone": { adImage: "https://tse4.mm.bing.net/th?id=OIP._FX2SEZqihA7u9-3u5yfiwHaEK&pid=Api&P=0&h=180", adLink: "/smartphones" },
    "laptop": { adImage: "https://tse1.mm.bing.net/th?id=OIP.50IxpewLcmpKxgJGN1clGwHaEc&pid=Api&P=0&h=180", adLink: "/laptops" },
};

function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q") || "all";
    const adData = searchAds[query] || { adImage: "/images/default-ad.jpg", adLink: "/" };
    const [adImage, setAdImage] = useState(null);

    useEffect(() => {
        // Parse document.cookie to get searchHistory
        const cookies = document.cookie.split("; ");
        const searchCookie = cookies.find((row) => row.startsWith("searchHistory="));

        if (searchCookie) {
            try {
                const cookieValue = decodeURIComponent(searchCookie.split("=")[1]);
                const searchHistory = JSON.parse(cookieValue);
                const recentQuery = searchHistory[searchHistory.length - 1]; // Most recent search term

                if (recentQuery) {
                    // Make API call to fetch ad image
                    axios
                        .get(`http://172.19.1.181:8080/ads/${encodeURIComponent(recentQuery)}`)
                        .then((response) => {
                            // Expecting something like { image: "http://..." }
                            console.log("response", response);
                            setAdImage(response.data.image);
                        })
                        .catch((err) => {
                            console.error("Error fetching ad image:", err);
                        });
                }
            } catch (err) {
                console.error("Failed to parse searchHistory cookie:", err);
            }
        }
    }, []);

    return (
        <div>
            <h2>Search Results for "{query}"</h2>
            <SearchAdBanner adImage={adImage} adLink={adData.adLink} />
            <SearchProductList products={sampleProducts} />
        </div>
    );
}

export default SearchResults;
