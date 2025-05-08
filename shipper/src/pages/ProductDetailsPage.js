import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import SearchAdBanner from "../Components/AdRecommendation/AdRecommendation";
import "./ProductDetailsPage.css";

function ProductDetailsPage() {
  const { name } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adImage, setAdImage] = useState(null);

  useEffect(() => {
    // Parse document.cookie to get searchHistory
    console.log("First time API call");
    // Make API call to fetch ad image
    try {
      axios
        .get(`http://localhost:8080/categorical-ads`, {
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
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/name/${encodeURIComponent(name)}`,
          {
            credentials: "include",
          }
        );
        console.log(res);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
        console.log(data);
      } catch (err) {
        console.error("Error loading product", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [name]);

  if (loading) return <div>Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-page">
      {product ? (
        <ProductDetails product={product} />
      ) : (
        <h2>Product not found</h2>
      )}
      <SearchAdBanner adImage={adImage} adLink="/" />
    </div>
  );
}

export default ProductDetailsPage;
