import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SearchAdBanner from "../Components/AdRecommendation/AdRecommendation";
import SearchProductList from "../Components/SearchResults/SearchProductList";


function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "all";
  const [adImage, setAdImage] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/search/${encodeURIComponent(query)}`, {
          credentials: 'include'
        });
        const data = await res.json();
        setProducts(data.products);
        // console.log(data);
      } catch (err) {
        console.error("Failed to fetch search results:", err);
      }
    };

    fetchProducts();
  }, [query]);


  useEffect(() => {
    // Parse document.cookie to get searchHistory
    console.log("First time API call");
    // Make API call to fetch ad image
    try {
      axios
        .get(
          `http://192.168.41.104:8080/categorical-ads/1`,
          {
            responseType: "blob",
            withCredentials: true,
          })
        .then((response) => {
          const url = URL.createObjectURL(response.data);
          setAdImage(url);
        })
        .catch((error) => {
          console.error("Error fetching ad image:", error);
        });
    } catch (err) {
      console.error("Failed to fetch ad Image", err);
    }
  }, [query]);

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <SearchAdBanner adImage={adImage} adLink="/" />
      <SearchProductList products={products} />
    </div>
  );
}

export default SearchResults;
