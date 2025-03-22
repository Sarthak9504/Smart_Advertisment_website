import React, { useState, useEffect, useCallback } from "react";
import "./AdBanner.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function AdBanner({ ads }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Memoized function to ensure stability across renders
    const nextAd = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, [ads.length]);

    // Auto-scroll every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextAd();
        }, 4000);
        return () => clearInterval(interval);
    }, [nextAd]);

    // Go to previous ad (circular)
    const prevAd = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length);
    };

    return (
        <div className="ad-banner">
            <button className="arrow left" onClick={prevAd}><FaChevronLeft /></button>

            <img src={ads[currentIndex]} alt="Ad" className="ad-image" />

            <button className="arrow right" onClick={nextAd}><FaChevronRight /></button>
        </div>
    );
}

export default AdBanner;