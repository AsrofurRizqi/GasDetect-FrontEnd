import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-800">
            <div className="container mx-auto py-8 text-white text-center">
                <div className="grid grid-cols-3 gap-4">
                    <div className="footer-section">
                        <h3 className="text-lg font-bold">About</h3>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3 className="text-lg font-bold">Features</h3>
                    </div>
                    <div className="footer-section">
                        <h3 className="text-lg font-bold">Our Contact</h3>
                        <ul>
                            <li>Email: example@example.com</li>
                            <li>Phone: 123-456-7890</li>
                            <li>Address: 123 Main St, City, State</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-blue-900 text-white text-center py-4">
                <p>2024 &copy; Made with ❤️ by Asrop</p>
            </div>
        </footer>
    );
};

export default Footer;