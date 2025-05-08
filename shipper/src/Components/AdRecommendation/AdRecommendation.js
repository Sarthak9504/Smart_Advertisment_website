import React from "react";
import "./AdRecommendation.css";

function AdRecommendation({ parent, adImage, adLink }) {
    return (
        <div className="search-ad-banner">
            <a href={adLink}>
                <img src={adImage} alt="Sponsored Ad" />
            </a>
        </div>
    );
}

export default AdRecommendation;
