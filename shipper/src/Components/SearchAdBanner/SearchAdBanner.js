import React from "react";
import "./SearchAdBanner.css";

function SearchAdBanner({ adImage, adLink }) {
    return (
        <div className="search-ad-banner">
            <a href={adLink}>
                <img src={adImage} alt="Sponsored Ad" />
            </a>
        </div>
    );
}

export default SearchAdBanner;
