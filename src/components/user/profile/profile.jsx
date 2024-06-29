import React, { useState } from 'react';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        // Logic for updating profile
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        // Logic for changing password
    };

    const handleProfileImageChange = (e) => {
        // Logic for updating profile image
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row">
                <div className="w-full md:w-2/3 pr-0 md:pr-8 mb-8 md:mb-0">
                    <h2 className="text-2xl font-bold mb-4">Change Profile Data</h2>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="address"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Phone
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4 flex items-center">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 w-full"
                                placeholder="Change Password"
                            />
                            <button
                                onClick={handlePasswordChange}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Change
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/3 flex flex-col items-center">
                    <div className="w-48 h-48 rounded-full border border-blue-500 flex items-center justify-center mb-4">
                        {/* Profile Image Placeholder */}
                        <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <button
                        onClick={handleProfileImageChange}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
                    >
                        Update Profile Image
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
