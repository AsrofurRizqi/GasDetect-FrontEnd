import React, { useState } from 'react';
import { signin, register } from '../apiServices.js';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        retypePassword: ''
    });
    const [error, setError] = useState('');

    const handleSlide = () => {
        setIsRegister(!isRegister);
        setFormData({
            name: '',
            email: '',
            password: '',
            retypePassword: ''
        });
        setError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isRegister && formData.password !== formData.retypePassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            if (isRegister) {
                await register(formData.name, formData.email, formData.password);
                alert('Registration successful');
                handleSlide(); // Switch to login form after successful registration
            } else {
                const response = await signin(formData.email, formData.password);

                if (response.role === 'admin') {
                    alert('Login successful as Admin');
                    // Redirect to admin dashboard
                    window.location.href = '/admin';
                } else if (response.role === 'user') {
                    alert('Login successful as User');
                    // Redirect to user dashboard
                    window.location.href = '/';
                } else {
                    alert('Unknown role');
                }
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {isRegister ? 'Register' : 'Login'}
                </h2>
                <form onSubmit={handleSubmit}>
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
                                value={formData.name}
                                onChange={handleChange}
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
                            value={formData.email}
                            onChange={handleChange}
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
                            value={formData.password}
                            onChange={handleChange}
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
                                value={formData.retypePassword}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    )}
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            className="text-blue-500 hover:underline"
                            onClick={handleSlide}
                        >
                            {isRegister ? 'Already have an account?' : 'Create an account'}
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            {isRegister ? 'Register' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
