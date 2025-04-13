import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Cart from "./pages/Cart";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Accounts from "./pages/Accounts";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/verify-token", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          dispatch(setUser({ email: data.email }));
        }
      } catch (err) {
        console.log("Token verification failed", err);
      }
    };

    checkToken();
  }, [dispatch]);

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