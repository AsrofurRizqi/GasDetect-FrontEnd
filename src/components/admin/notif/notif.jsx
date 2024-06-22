import React, { useState, useEffect } from "react";

const Notif = () => {
    // State untuk form input
    const [formData, setFormData] = useState({
        id_user: '',
        no_hp_old: '',
        no_hp_new: ''
    });

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    // Load users from localStorage on component mount
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    // Handle change untuk input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle submit untuk form
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Reset error state

        const selectedUser = users.find(user => user.username === formData.id_user);
        if (selectedUser) {
            if (selectedUser.no_hp === formData.no_hp_old) {
                // Logika untuk memperbarui nomor HP
                const updatedUsers = users.map(user =>
                    user.username === formData.id_user ? { ...user, no_hp: formData.no_hp_new } : user
                );
                setUsers(updatedUsers);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                alert('No HP updated successfully');
            } else {
                setError('No HP lama tidak sesuai');
            }
        }
    };

    return (
        <div className="mt-20 md:mt-8 px-2">
            <h2 className="text-2xl font-bold mb-4 flex justify-center">User Damkar Setings</h2>
            <form onSubmit={handleSubmit} className="bg-slate-400 p-4 rounded shadow-md max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="id_user" className="block text-gray-700">User Name</label>
                    <select
                        id="id_user"
                        name="id_user"
                        value={formData.id_user}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user.username} value={user.username}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="no_hp_old" className="block text-gray-700">No HP Old</label>
                    <input
                        type="text"
                        id="no_hp_old"
                        name="no_hp_old"
                        value={formData.no_hp_old}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="no_hp_new" className="block text-gray-700">No HP New</label>
                    <input
                        type="text"
                        id="no_hp_new"
                        name="no_hp_new"
                        value={formData.no_hp_new}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Notif;
