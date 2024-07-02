import React from 'react';
import Swal from 'sweetalert2';
import { adminVerifyUser, adminDeactivateUser } from '../../../apiServices';

const CardUser = ({ user }) => {
    const authToken = localStorage.getItem('token');

    const handleVerifyClick = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to activate ${user.username}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, activate it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await adminVerifyUser(authToken, user.id);
                    if (response.message) {
                        Swal.fire('Success', `${user.username} has been activated.`, 'success');
                        window.location.reload();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: response.message || 'Error activating user',
                        });
                    }
                } catch (error) {
                    console.error('Error activating user:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error activating user',
                    });
                }
            }
        });
    };

    const handleUnverifyClick = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to deactivate ${user.username}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, deactivate it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await adminDeactivateUser(user.id, authToken);
                    if (response.message) {
                        Swal.fire('Success', `${user.username} has been deactivated.`, 'success');
                        window.location.reload();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: response.message || 'Error deactivating user',
                        });
                    }
                } catch (error) {
                    console.error('Error deactivating user:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error deactivating user',
                    });
                }
            }
        });
    };

    return (
        <div className="bg-gray-300 w-full shadow-md rounded-md p-2 mb-4 border border-blue-500">
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
            <div className="status flex justify-between">
                <div className="flex">
                    <span className="mr-1">Status :</span>
                    <p className={`${user.is_activated ? 'text-green-500' : 'text-red-500'}`}>
                        {user.is_activated ? 'Activate' : 'Deactivate'}
                    </p>
                </div>
                {user.is_activated ? (
                    <button
                        onClick={handleUnverifyClick}
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    >
                        Deactivate
                    </button>
                ) : (
                    <button
                        onClick={handleVerifyClick}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                        Activate
                    </button>
                )}
            </div>
        </div>
    );
};

export default CardUser;