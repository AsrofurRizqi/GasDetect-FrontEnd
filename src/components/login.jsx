import React, { useState, useEffect } from 'react';
import { signin, register, forgotPassword } from '../apiServices.js';
import Alert from './alert';
import QrScanner from 'react-qr-scanner';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        retypePassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [qrCodeValue, setQrCodeValue] = useState('');
    const [qrScanError, setQrScanError] = useState('');
    const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
    const authToken = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (authToken) {
        if (role === 'admin') {
            window.location.href = '/admin';
        } else if (role === 'user') {
            window.location.href = '/user';
        }
    }

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleSlide = (form) => {
        setIsRegister(form === 'register');
        setIsForgotPassword(form === 'forgotPassword');
        setFormData({
            name: '',
            email: '',
            phone: '',
            password: '',
            retypePassword: ''
        });
        setError('');
        setSuccess('');
        setQrCodeValue('');
        setQrScanError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setError('');
        setSuccess('');
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.startsWith('@gmail.', email.indexOf('@'));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (isForgotPassword) {
            if (!formData.email) {
                setError('Please fill email field');
                return;
            }
            if (!isValidEmail(formData.email)) {
                setError('Invalid email. Only Gmail addresses are allowed.');
                return;
            }
            try {
                const response = await forgotPassword(formData.email);
                if (response.status === 200) {
                    setSuccess('Password reset email sent successfully');
                } else {
                    setError('Account Not Found');
                }
            } catch (err) {
                setError(err.message);
            }
            return;
        }

        if (!formData.email || !formData.password) {
            setError('Please fill all fields');
            return;
        }

        if (!isValidEmail(formData.email)) {
            setError('Invalid email. Only gmail addresses are allowed.');
            return;
        }

        if (isRegister && formData.password !== formData.retypePassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            if (isRegister) {
                if (!formData.name || !formData.phone) {
                    setError('Please fill name field');
                    return;
                }
                const regis = await register(formData.name, formData.email, formData.password, formData.retypePassword, formData.phone, qrCodeValue);

                if (regis.status === 200) {
                    setSuccess('Registration successful, check your email to verify');
                    setTimeout(() => { handleSlide(); }, 3000);
                } else if (regis.message === "Account already exist") {
                    setError('Email already exist');
                } else if (regis.message === "Password not match") {
                    setError('Password not match');
                } else if (regis.message === "All field is required") {
                    setError('Please fill all field');
                } else if (regis.message === "Phone number not valid") {
                    setError('Invalid phone number');
                } else if (regis.message === "Device already registered on other account") {
                    setError('Device already registered on other account');
                } else if (regis.message === "Email not accepted or not valid") {
                    setError('Invalid email');
                } else {
                    setError('Registration failed');
                }
            } else {
                const response = await signin(formData.email, formData.password);
                if (response.role === 'admin') {
                    setSuccess('Login successful as Admin');
                    setTimeout(() => {
                        window.location.href = '/admin';
                    }, 1000);
                } else if (response.role === 'user') {
                    setSuccess('Login successful as User');
                    setTimeout(() => {
                        window.location.href = '/user';
                    }, 1000);
                } else if (response.message === "Account not found") {
                    setError('invalid account');
                } else if (response.message === "Password not match") {
                    setError('Invalid password');
                } else if (response.message === "Please fill all field") {
                    setError('Please fill all field');
                } else if (response.status === 400) {
                    setError('Please contact admin to activate your account');
                } else {
                    setError('Email or Password Invalid');
                }
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleScan = (data) => {
        if (data) {
            setQrCodeValue(data.text);
            setQrScanError('');
            setIsQrScannerOpen(false);
        }
    };

    const handleError = (err) => {
        setQrScanError('Error scanning Device Code');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {isRegister ? 'Register' : isForgotPassword ? 'Forgot Password' : 'Login'}
                </h2>
                {error && <Alert message={error} type="error" onClose={() => setError('')} />}
                {success && <Alert message={success} type="success" onClose={() => setSuccess('')} />}
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
                    {isRegister && (
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
                    )}
                    {!isForgotPassword && (
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
                    )}
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
                    {!isForgotPassword && isRegister && (
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Device Code</label>
                            <div className="flex">
                                <button
                                    type="button"
                                    className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l"
                                    onClick={() => setIsQrScannerOpen(!isQrScannerOpen)}
                                >
                                    {isQrScannerOpen ? 'Close Qr Scan' : 'Open Qr Scan'}
                                </button>
                                {isQrScannerOpen && (
                                    <div className="w-1/2">
                                        <QrScanner
                                            delay={300}
                                            onError={handleError}
                                            onScan={handleScan}
                                            style={{ width: '100%' }}
                                            facingMode="rear"
                                        />
                                    </div>
                                )}
                            </div>
                            {qrCodeValue && <p className="text-green-500 mt-2">Device Code : {qrCodeValue}</p>}
                            {qrScanError && <p className="text-red-500 mt-2">{qrScanError}</p>}
                        </div>
                    )}
                    <div className="flex justify-between mt-4">
                        {!isForgotPassword && (
                            <>
                                <button
                                    type="button"
                                    className="text-blue-500 hover:underline"
                                    onClick={() => handleSlide(isRegister ? 'login' : 'register')}
                                >
                                    {isRegister ? 'Already have an account?' : 'Create an account'}
                                </button>
                                <button
                                    type="button"
                                    className="text-blue-500 hover:underline"
                                    onClick={() => handleSlide('forgotPassword')}
                                >
                                    Forgot Password?
                                </button>
                            </>
                        )}
                        {isForgotPassword && (
                            <button
                                type="button"
                                className="text-blue-500 hover:underline"
                                onClick={() => handleSlide('login')}
                            >
                                Back to Login
                            </button>
                        )}
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            {isRegister ? 'Register' : isForgotPassword ? 'Send Reset Email' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
