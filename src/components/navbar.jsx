import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between bg-blue-800 p-4">
            <Link to="/" className="text-white text-lg font-bold"
            > Kuro Gas Detector
            </Link>
            <div>
                <Link to="/" className="text-white ml-4">Home</Link>
                <Link to="/about" className="text-white ml-4">About</Link>
                <Link to="/contact" className="text-white ml-4">Contact</Link>
                <Link to="/products" className="text-white ml-4 mr-4">Products</Link>
                <Link to="/login" className="text-white ">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        Login
                    </button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;