import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Data = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.kuroshop.my.id/api/data/test');
                const jsonData = await response.json();
                setData(jsonData.data); // Access the data array from the response object
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-3 gap-4">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-4 rounded-lg shadow-lg"
                    >
                        <h2 className="text-lg font-bold mb-2">{moment(item.timestamp).utcOffset(7).format('YYYY-MM-DD HH:mm:ss')}</h2>
                        <div className="text-gray-600">Status: {item.status}</div>
                        <div className="text-gray-600">PPM: {item.ppm}</div>
                        <div className="text-gray-600">Temperature: {item.temperature}</div>
                        <div className="text-gray-600">Humidity: {item.humidity}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Data;