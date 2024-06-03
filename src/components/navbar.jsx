import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between bg-gray-600 p-4">
            <div className="text-white text-lg font-bold">Kuro Gas Detector</div>
            <div>
                <a href="/" className="text-white">Home</a>
                <a href="/" className="text-white ml-4">About</a>
                <a href="/" className="text-white ml-4">Contact</a>
                <a href="/" className="text-white ml-4">Services</a>
                <a href="/" className="text-white ml-4">Products</a>
                <Link to="/data" className="text-white ml-4 mr-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        Data
                    </button>
                </Link>
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