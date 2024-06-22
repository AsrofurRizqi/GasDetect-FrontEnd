import { Outlet } from "react-router-dom";
import React, { useState } from 'react';
import Navside from "../sidebar";

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex relative">
            <Navside isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 md:ml-16">
                {isOpen && (
                    <div className="fixed inset-0 bg-slate-800 bg-opacity-50 z-10" onClick={toggleSidebar}></div>
                )}
                <div className={` h-screen relative z-20 ${isOpen ? 'pointer-events-none' : ''}`}>
                    <Outlet  />
                </div>
            </div>
        </div>
    );
};

export default Layout;
