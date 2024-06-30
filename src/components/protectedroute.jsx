import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { checkToken } from '../apiServices.js';

const ProtectedRoute = ({ element: Component }) => {
    const location = useLocation();
    const authToken = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    const validateToken = async () => {
        if (!authToken || !userRole) {
            return false;
        }

        try {
            const response = await checkToken(authToken);
            if (response.status === 200) {
                return true;
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                return false;
            }
        } catch (error) {
            console.error('Token validation error:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            return false;
        }
    };

    const [isValidToken, setIsValidToken] = React.useState(null);

    React.useEffect(() => {
        const checkValidToken = async () => {
            const isValid = await validateToken();
            setIsValidToken(isValid);
        };

        checkValidToken();
        // eslint-disable-next-line
    }, [location.pathname]); 

    if (isValidToken === null) {
        return null; 
    }

    if (!isValidToken) {
        return <Navigate to="/login" />;
    }

    if ((location.pathname.startsWith('/user') && userRole === 'admin')) {
        return <Navigate to="/admin" />;
    } else if ((location.pathname.startsWith('/admin') && userRole === 'user')) {
        return <Navigate to="/user" />;
    }

    return <Component />;
};

export default ProtectedRoute;
