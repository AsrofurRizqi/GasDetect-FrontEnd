import React from 'react';
import Swal from 'sweetalert2';

const CardUser = ({ user, onVerify, onUnverify }) => {
    const handleVerifyClick = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to verify ${user.username}. This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, verify it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onVerify(user.username);
                Swal.fire(
                    'Verified!',
                    `${user.username} has been verified.`,
                    'success'
                );
            }
        });
    };

    const handleUnverifyClick = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to unverify ${user.username}. This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, unverify it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onUnverify(user.username);
                Swal.fire(
                    'Unverified!',
                    `${user.username} has been unverified.`,
                    'success'
                );
            }
        });
    };

    return (
        <div className="bg-gray-300 shadow-md rounded-md p-4 mb-4">
            <div className="top flex justify-between">
                <h2 className="text-lg font-semibold">{user.username}</h2>
                <span className="text-gray-600">{user.creat_at}</span>
            </div>
            <div className="email flex">
                <span className="mr-1">Email :</span>
                <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="phone flex">
                <span className="mr-1">Phone :</span>
                <p className="text-gray-600">{user.phone}</p>
            </div>
            <div className="very flex justify-between">
                <div className="flex">
                    <span className="mr-1">Status :</span>
                    <p className={` ${user.isVerified ? 'text-green-500' : 'text-red-500'}`}>
                        {user.isVerified ? 'Verified' : 'Not Verified'}
                    </p>
                </div>
                {user.isVerified ? (
                    <button
                        onClick={handleUnverifyClick}
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    >
                        Unverify
                    </button>
                ) : (
                    <button
                        onClick={handleVerifyClick}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                        Verify
                    </button>
                )}
            </div>
        </div>
    );
};

export default CardUser;
