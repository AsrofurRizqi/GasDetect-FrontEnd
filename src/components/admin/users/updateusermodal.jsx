import React, { useState, useEffect } from 'react';
import { adminUpdateUser } from '../../../apiServices';
import Swal from 'sweetalert2';

const UpdateUserModal = ({ isOpen, onClose, user }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || '',
                password: '', // You might want to leave this empty for security reasons
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('token');
        const updateUser = async () => {
            try {
                const response = await adminUpdateUser(user.id, formData, authToken);
                if (response.message) {
                    Swal.fire('Success', 'User updated successfully!', 'success');
                    window.location.reload();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.message || 'Error updating user',
                    });
                }
            } catch (error) {
                console.error('Error updating user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error updating user',
                });
            }
        };
        updateUser();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Update User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserModal;
