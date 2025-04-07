import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const formattedQuery = searchQuery.toLowerCase().replace(/\s+/g, ' ').trim();

            const existingCookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('searchHistory='));

            let searchHistory = [];

            if (existingCookie) {
                try {
                    const cookieValue = decodeURIComponent(existingCookie.split('=')[1]);
                    searchHistory = JSON.parse(cookieValue);
                } catch (error) {
                    console.error("Failed to parse cookie:", error);
                    searchHistory = [];
                }
            }

            if (searchHistory[searchHistory.length - 1] !== formattedQuery) {
                searchHistory.push(formattedQuery);
            }

            // Store the cookie
            const cookieValue = encodeURIComponent(JSON.stringify(searchHistory));
            document.cookie = `searchHistory=${cookieValue}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days

            // Log the cookie to console
            console.log("Updated searchHistory cookie:", document.cookie);

            navigate(`/search?q=${encodeURIComponent(formattedQuery)}`);
        }
    };


    return (
        <nav className="navbar">
            <a href="/" className="logo">Shipper.com</a>
            <div className="location">
                <FaMapMarkerAlt />
                <span>Deliver to Sarthak<br /><strong>Pune 411042</strong></span>
            </div>

            {/* Search Bar */}
            <form className="search-bar" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">
                    <FaSearch />
                </button>
            </form>

            <div className="nav-icons">
                <a href="/account" className="account">
                    <FaUser />
                    <span>Account</span>
                </a>
                <a href="/cart" className="cart">
                    <FaShoppingCart />
                    <span className="cart-count">0</span>
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
