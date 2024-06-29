import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
    const location = useLocation();
    const authToken = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!authToken || !userRole) {
        return <Navigate to="/login" />;
    }

    const path = location.pathname;

    if ((path.startsWith('/user') && userRole === 'admin')) {
        return <Navigate to="/admin" />;
    } else if ((path.startsWith('/admin') && userRole === 'user')) {
        return <Navigate to="/user" />;
    }

    return <Component />;
};

export default ProtectedRoute;