import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
    const authToken = localStorage.getItem('token');
    
    return authToken ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;