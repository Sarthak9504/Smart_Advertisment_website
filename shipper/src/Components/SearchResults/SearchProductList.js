import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./SearchProductList.css";

function SearchResults({ products }) {
    return (
        <div className="search-results">
            {products.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    );
}

export default SearchResults;
