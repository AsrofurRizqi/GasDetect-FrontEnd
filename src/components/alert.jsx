import React from 'react';

const Alert = ({ message, type, onClose }) => {
    const alertStyle = type === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700';

    return (
        <div className={`border-l-4 p-4 mb-4 ${alertStyle} rounded`} role="alert">
            <div className="flex justify-between">
                <span>{message}</span>
                <button onClick={onClose} className="text-2xl font-bold">×</button>
            </div>
        </div>
    );
};

export default Alert;
