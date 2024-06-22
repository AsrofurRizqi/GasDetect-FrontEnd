import React, { useState, useEffect } from 'react';
import CardUser from './card'; // Sesuaikan dengan path lokasi CardUser

const VerifyUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(3);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.length === 0) {
            // Tambahkan pengguna dummy
            const dummyUsers = [
                { username: 'user1', password: 'pass1', isVerified: false, email: 'email@gmail.com', phone: '081234567890', creat_at: '2021-10-10'},
                { username: 'user2', password: 'pass2', isVerified: false,  email: 'email@gmail.com', phone: '081234567890', creat_at: '2021-10-10'},
                { username: 'user3', password: 'pass3', isVerified: true, email: 'email@gmail.com', phone: '081234567890', creat_at: '2021-10-10'},
                { username: 'user4', password: 'pass4', isVerified: false, email: 'email@gmail.com', phone: '081234567890', creat_at: '2021-10-10' },
                { username: 'user5', password: 'pass1', isVerified: false, email: 'email@gmail.com', phone: '081234567890', creat_at: '2021-10-10' },
                { username: 'user6', password: 'pass2', isVerified: false, email: 'email@gmail.com', phone: '081234567890', creat_at: '2021-10-10' },
                { username: 'user7', password: 'pass3', isVerified: true, email: 'email@gmail.com', phone: '081234567890', creat_at: '2021-10-10' },
                { username: 'user8', password: 'pass4', isVerified: false, email: 'email@gmail.com', phone: '081234567890', creat_at: '2021-10-10' },
                { username: 'user9', password: 'pass1', isVerified: false, email: 'email@gmail.com', phone: '081234567890', creat_at: '2021-10-10' },
                { username: 'user10', password: 'pass2', isVerified: false, email: 'email@gmail.com', phone: '081234567890', creat_at: '2021-10-10' },
                { username: 'user11', password: 'pass3', isVerified: true, email: 'email@gmail.com', phone: '081234567890', creat_at: '2021-10-10' },
                { username: 'user12', password: 'pass4', isVerified: false, email: 'email@gmail.com', phone: '081234567890', creat_at: '2021-10-10' },
            ];
            localStorage.setItem('users', JSON.stringify(dummyUsers));
        }
    }, []);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const handleVerify = (username) => {
        const updatedUsers = users.map(user =>
            user.username === username ? { ...user, isVerified: true } : user
        );
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
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
            <h2 className="text-2xl font-bold mb-4">Verify Users</h2>
            <div className="grid gap-4 md:grid-cols-3">
                {currentUsers.map(user => (
                    <CardUser key={user.username} user={user} onVerify={handleVerify} onUnverify={handleUnverify} />
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
};

export default VerifyUsers;
