import React, { useState } from 'react';
import { userUpdateNumber } from '../../../apiServices';

const ManageNotificationNumbers = ({ initialData }) => {
    const [data, setData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleUpdate = async (numberKey) => {
        try {
            await userUpdateNumber(data.id, { [numberKey]: data[numberKey] });
            alert(`${numberKey} updated successfully`);
        } catch (error) {
            console.error(`Error updating ${numberKey}`, error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Manage Notification Number</h2>
                <div className="flex justify-between">
                    {Object.keys(data).filter(key => key.startsWith('nomor')).map((numberKey, index) => (
                        <div key={index} className="w-1/3 px-4">
                            <div className="mb-4">
                                <label
                                    htmlFor={numberKey}
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    {`Number ${index + 1}`}
                                </label>
                                <input
                                    type="text"
                                    id={numberKey}
                                    name={numberKey}
                                    value={data[numberKey]}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <button
                                onClick={() => handleUpdate(numberKey)}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                disabled={data[numberKey] === initialData[numberKey]}
                            >
                                Change
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageNotificationNumbers;
