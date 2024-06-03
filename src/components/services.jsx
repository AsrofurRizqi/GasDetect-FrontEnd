import React from 'react';
import { FaTools, FaCheck, FaHome, FaTruck } from 'react-icons/fa';

const Services = () => {
    return (
        <div>
            <div className="text-center py-8 text-3xl font-bold">
                <h1>Welcome to Our Services</h1>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div className="max-w-sm rounded-lg overflow-hidden shadow-md inline-block border-1 border-gray-200">
                    <FaTools className="w-full h-40 text-blue-400" />
                    <div className="px-6 py-4">
                        <p className="text-xl font-bold mb-2">Manageable</p>
                    </div>
                </div>
                <div className="max-w-sm rounded-lg overflow-hidden shadow-md inline-block border-1 border-gray-200">
                    <FaCheck className="w-full h-40 text-blue-400" />
                    <div className="px-6 py-4">
                        <p className="text-xl font-bold mb-2">Data Report</p>
                    </div>
                </div>
                <div className="max-w-sm rounded-lg overflow-hidden shadow-md inline-block border-1 border-gray-200">
                    <FaHome className="w-full h-40 text-blue-400" />
                    <div className="px-6 py-4">
                        <p className="text-xl font-bold mb-2">Area Detection</p>
                    </div>
                </div>
                <div className="max-w-sm rounded-lg overflow-hidden shadow-md inline-block border-1 border-gray-200">
                    <FaTruck className="w-full h-40 text-blue-400" />
                    <div className="px-6 py-4">
                        <p className="text-xl font-bold mb-2">Remote Service</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;