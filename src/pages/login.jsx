import React, { useState } from 'react';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);

    const handleSlide = () => {
        setIsRegister(!isRegister);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">
                    {isRegister ? 'Register' : 'Login'}
                </h2>
                <form>
                    {isRegister && (
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
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    )}
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
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {isRegister && (
                        <div className="mb-6">
                            <label
                                htmlFor="retypePassword"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Retype Password
                            </label>
                            <input
                                type="password"
                                id="retypePassword"
                                name="retypePassword"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    )}
                </form>
                <div className="flex justify-between mt-4">
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={handleSlide}
                    >
                        {isRegister ? 'Already have an account?' : 'Create an account'}
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        {isRegister ? 'Register' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;