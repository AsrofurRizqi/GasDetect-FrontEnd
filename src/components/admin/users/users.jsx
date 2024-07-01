import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import CreateUserModal from './createusermodal';
import UpdateUserModal from './updateusermodal';
import {adminGetUsers, adminDeleteUser} from '../../../apiServices';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const authToken = localStorage.getItem('token');
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await adminGetUsers(authToken);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error fetching users',
                });
            }
        };

        fetchUsers();
    }, []);

    const handleCreateUser = (user) => {
        const updatedUsers = [...users, user];
        setUsers(updatedUsers);
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

    //adminDeleteUser
    const handleDeleteUser = (id, username) => {
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: `Anda akan menghapus ${username}. Tindakan ini tidak dapat dibatalkan.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Batal',
            confirmButtonText: 'Ya, hapus!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await adminDeleteUser(id, authToken);
                    if (response.message === 'User deleted') {
                        const updatedUsers = users.filter(user => user.id !== id);
                        setUsers(updatedUsers);
                        Swal.fire('Deleted!', 'User has been deleted.', 'success');
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: response.message || 'Error deleting user',
                        });
                    }
                } catch (error) {
                    console.error('Error deleting user:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error deleting user',
                    });
                }
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
                {users.filter(user => user.role !== 'admin').map(user => (
                    <div key={user.id} className="bg-gray-300 shadow-md rounded-md p-4">
                        <div className="top flex justify-between">
                            <h2 className="text-lg font-semibold">{user.username}</h2>
                            <span className="text-gray-600">{user.created_at}</span>
                        </div>
                        <div className="email flex">
                            <span className="mr-1">Email :</span>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                        <div className="phone flex">
                            <span className="mr-1">Phone :</span>
                            <p className="text-gray-600">{user.phone}</p>
                        </div>
                        <div className="flex">
                                <span className="mr-1">Activated :</span>
                                <p className={` ${user.is_activated ? 'text-green-500' : 'text-red-500'}`}>
                                    {user.is_activated ? 'Activated' : 'Not Activated'}
                                </p>
                            </div>
                        <div className="very flex justify-between">
                            <div className="flex">
                                <span className="mr-1">Verified :</span>
                                <p className={` ${user.is_verified ? 'text-green-500' : 'text-red-500'}`}>
                                    {user.is_verified ? 'Verified' : 'Not Verified'}
                                </p>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setIsUpdateModalOpen(true);
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeleteUser(user.id, user.username)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </div>
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
