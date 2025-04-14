// ProductDetailsPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../Components/ProductDetails/ProductDetails";

function ProductDetailsPage() {
    const { name } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/products/name/${encodeURIComponent(name)}`);
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
        <div>
            {product ? (
                <ProductDetails product={product} />
            ) : (
                <h2>Product not found</h2>
            )}
        </div>
    );
}

export default ProductDetailsPage;
