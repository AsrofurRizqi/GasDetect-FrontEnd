import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Slider = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
    };

    const previousImage = () => {
        setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
    };

    return (
        <div className="relative">
            <img src={images[currentImage]} alt="Banner" className="w-full h-auto" />

            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={previousImage}
            >
                <FaArrowLeft />
            </button>

            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={nextImage}
            >
                <FaArrowRight />
            </button>
        </div>
    );
};

export default Slider;