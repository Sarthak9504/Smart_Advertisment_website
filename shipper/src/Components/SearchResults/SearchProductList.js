import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./SearchProductList.css";

function SearchResults({ products }) {
  return (
    <div className="search-results">
      {products && products.length > 0 ? (
        products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))
      ) : (
        <p>No Product of Given Name</p>
      )}
    </div>
  );
}

export default SearchResults;
