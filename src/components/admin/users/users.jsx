import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import CreateUserModal from './createusermodal';
import UpdateUserModal from './updateusermodal';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const handleCreateUser = (user) => {
        const updatedUsers = [...users, user];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        Swal.fire('Success', 'User created successfully!', 'success');
    };

    const handleUpdateUser = (updatedUser) => {
        const updatedUsers = users.map(user =>
            user.username === updatedUser.username ? updatedUser : user
        );
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        Swal.fire('Success', 'User updated successfully!', 'success');
    };

    const handleDeleteUser = (username) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedUsers = users.filter(user => user.username !== username);
                setUsers(updatedUsers);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
            }
        });
    };

    return (
        <div className="users pt-16 mb-10 md:pt-0 px-2">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
            >
                Create User
            </button>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {users.map(user => (
                    <div key={user.username} className="bg-gray-300 shadow-md rounded-md p-4">
                        <h3 className="text-lg font-semibold">{user.username}</h3>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-gray-600">{user.phone}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => {
                                    setSelectedUser(user);
                                    setIsUpdateModalOpen(true);
                                }}
                                className="bg-yellow-500 text-white py-2 px-4 rounded"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDeleteUser(user.username)}
                                className="bg-red-500 text-white py-2 px-4 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <CreateUserModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateUser}
            />
            <UpdateUserModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                user={selectedUser}
                onUpdate={handleUpdateUser}
            />
        </div>
    );
};

export default Users;
