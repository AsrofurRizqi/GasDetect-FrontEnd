import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ProductCard from "../components/productcard";

const products = [
    {
        id: 1,
        name: "LPG Gas Detector",
        description: "This is a great product that detects gas.",
        price: "29.99",
        image: "https://res.cloudinary.com/dkxt6mlnh/image/upload/v1720408711/ta/m4yyngdgc1dj5tobdwej.jpg"
    },
    {
        id: 2,
        name: "LPG Gas Detector KIT",
        description: "This is a great product that detects carbon monoxide.",
        price: "39.99",
        image: "https://res.cloudinary.com/dkxt6mlnh/image/upload/v1720408711/ta/dv4xvzu6nbgjrhvfbf0j.jpg"
    }
];

const ProductPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow p-4 bg-gray-100">
                <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductPage;