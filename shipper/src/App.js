import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Cart from "./pages/Cart";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Accounts from "./pages/Accounts"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/accounts/signin" element={<Accounts />} />
        <Route path="/accounts/signup" element={<Accounts />} />
        <Route path="/accounts/profile" element={<Accounts />} />
      </Routes>
    </Router>
  );
}

export default App;
