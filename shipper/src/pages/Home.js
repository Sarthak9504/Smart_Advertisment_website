import React, { useEffect, useState } from "react";
import AdBanner from "../Components/AdBanner/AdBanner";
import ProductSection from "../Components/ProductSection/ProductSection";

const adImages = [
  "https://placehold.co/1000x400?text=Laptop+Ad",
  "https://placehold.co/1000x400?text=Watch+Ad",
  "https://placehold.co/1000x400?text=Phone+Ad",
];

function Home() {
  const [productsData, setProductsData] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products", {
          credentials: "include",
        });
        const data = await res.json();
        setProductsData(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <AdBanner ads={adImages} />
      {Object.keys(productsData).map((category) => (
        <ProductSection
          key={category}
          title={category}
          products={productsData[category]}
        />
      ))}
    </div>
  );
}

export default Home;
