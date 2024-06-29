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
        return <div>Loading...</div>;
    }

    return <ManageNotificationNumbers initialData={initialData} />;
};

export default ParentComponent;
