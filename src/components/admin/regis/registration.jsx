import React, { useEffect, useState} from "react";
import CardUser from "./card";
import {adminGetUsers, adminVerifyUser} from '../../../apiServices';
import Swal from 'sweetalert2';

const Registration = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(3);
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

    const handleVerify = (username) => {

    };

    const handleUnverify = (username) => {
        const updatedUsers = users.map(user =>
            user.username === username ? { ...user, isVerified: false } : user
        );
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    useEffect(() => {
        const updateUsersPerPage = () => {
            if (window.innerWidth < 768) {
                setUsersPerPage(3);
            } else {
                setUsersPerPage(9);
            }
        };

        window.addEventListener('resize', updateUsersPerPage);
        updateUsersPerPage();

        return () => window.removeEventListener('resize', updateUsersPerPage);
    }, []);

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="verify-users pt-16 mb-10 md:pt-0 px-2">
            <h2 className="text-2xl font-bold mb-4">Verify Users Registration</h2>
            <div className="grid gap-3 md:grid-cols-3">
                {currentUsers.map(user => (
                    <CardUser key={user.id} user={user} onVerify={handleVerify} onUnverify={handleUnverify} />
                ))}
            </div>
            <div className="pagination flex justify-end mb-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mb-2 px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Registration;