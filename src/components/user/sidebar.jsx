import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegWindowClose } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { FaHome, FaUserSecret } from "react-icons/fa";
import { MdEditNotifications } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import ConfirmLogoutModal from '../logoutmodal';

const Navside = ({ isOpen, toggleSidebar }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleLinkClick = (path) => {
        navigate(path);
        toggleSidebar();
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="relative">
            {!isOpen && (
                <div className="top md:hidden fixed w-full flex justify-between items-center z-50 p-4 bg-blue-800">
                    <button
                        onClick={toggleSidebar}
                        className=" ml-2 md:mr-2 text-white  hover:bg-white p-2 hover:text-blue-800 rounded-md"
                    >
                        <CiMenuBurger />
                    </button>
                    <Link to="/user" className="text-white text-lg font-bold">
                        Kuro Gas Detector
                    </Link>
                </div>
            )}

            {isOpen ? (
                <div className="h-screen w-64 bg-blue-800 text-white flex flex-col p-4 fixed z-50">
                    <div className="top flex justify-between mb-8">
                        <Link to="/user" className="text-lg font-bold">Kuro Gas Detector</Link>
                        <button
                            onClick={toggleSidebar}
                            className="text-white p-2 bg-blue-800 hover:bg-red-500 hover:text-white rounded-md"
                        >
                            <FaRegWindowClose />
                        </button>
                    </div>

                    <div onClick={() => handleLinkClick('/user')} className="cursor-pointer rounded-md flex mb-2 text-left hover:bg-white hover:text-blue-600 hover:font-bold">
                        <FaHome className='mt-1 m-2 transition duration-200 ease-in-out' />
                        <span className="ml-2 ">Home</span>
                    </div>
                    <div onClick={() => handleLinkClick('/user/profiles')} className="cursor-pointer rounded-md flex mb-2 text-left hover:bg-white hover:text-blue-600 hover:font-bold">
                        <IoIosCreate className='mt-1 m-2 transition duration-200 ease-in-out' />
                        <span className="ml-2">Profiles</span>
                    </div>
                    <div onClick={() => handleLinkClick('/user/reports')} className="cursor-pointer rounded-md flex mb-2 text-left hover:bg-white hover:text-blue-600 hover:font-bold">
                        <FaUserSecret className='mt-1 m-2 transition duration-200 ease-in-out' />
                        <span className="ml-2">Reports</span>
                    </div>
                    <div onClick={() => handleLinkClick('/user/devices')} className="cursor-pointer rounded-md flex mb-2 text-left hover:bg-white hover:text-blue-600 hover:font-bold">
                        <MdEditNotifications className='mt-1 m-2 transition duration-200 ease-in-out' />
                        <span className="ml-2">Devices</span>
                    </div>
                    <div onClick={() => handleLinkClick('/user/notif')} className="cursor-pointer rounded-md flex mb-2 text-left hover:bg-white hover:text-blue-600 hover:font-bold">
                        <MdEditNotifications className='mt-1 m-2 transition duration-200 ease-in-out' />
                        <span className="ml-2">Notification</span>
                    </div>

                    <div onClick={handleOpenModal} className="mt-auto cursor-pointer flex">
                        <div className="bg-red-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full text-center">
                            Logout
                        </div>
                    </div>
                </div>
            ) : (
                <div className=" bg-blue-800 text-white flex flex-col items-center justify-top fixed z-20 md:h-screen">
                    <button
                        onClick={toggleSidebar}
                        className="mt-2 ml-2 md:mr-2 text-white p-4 hover:bg-white hover:text-blue-800 rounded-md"
                    >
                        <CiMenuBurger />
                    </button>
                </div>
            )}

            <ConfirmLogoutModal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                onConfirm={handleLogout}
            />
        </div>
    );
};

export default Navside;
