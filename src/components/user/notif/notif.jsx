import React, { useEffect, useState } from 'react';
import ManageNotificationNumbers from './updatenumber';
import { getUserNomor } from '../../../apiServices';

const ParentComponent = () => {
    const [initialData, setInitialData] = useState(null);
    const authToken = localStorage.getItem('token');

    useEffect(() => {
        const fetchNumbers = async () => {
            try {
                const response = await getUserNomor(authToken);
                setInitialData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchNumbers();
    }, [authToken]);

    if (!initialData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                <span className="ml-4 text-blue-500">Loading Data...</span>
            </div>
        );
    }

    return <ManageNotificationNumbers initialData={initialData} />;
};

export default ParentComponent;
