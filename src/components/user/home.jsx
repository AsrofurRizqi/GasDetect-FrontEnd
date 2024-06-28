import React from 'react';
import { FaMobileAlt, FaFileAlt , FaExclamationTriangle } from 'react-icons/fa';
const Home = ({ totalDevices, totalReports, totalLogs , totalEvents }) => {
    return (
        <div className="home flex justify-center items-center min-h-screen p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card bg-blue-500 text-white rounded-lg p-8 shadow-lg flex items-center">
                    <FaMobileAlt className="text-6xl mr-4" />
                    <div>
                        <h2 className="text-2xl font-bold">Devices</h2>
                        <p className="text-4xl">{totalDevices}</p>
                    </div>
                </div>
                <div className="card bg-blue-500 text-white rounded-lg p-8 shadow-lg flex items-center">
                    <FaFileAlt className="text-6xl mr-4" />
                    <div>
                        <h2 className="text-2xl font-bold">Reports</h2>
                        <p className="text-4xl">{totalReports}</p>
                    </div>
                </div>
                <div className="card bg-blue-500 text-white rounded-lg p-8 shadow-lg flex items-center">
                    <FaFileAlt className="text-6xl mr-4" />
                    <div>
                        <h2 className="text-2xl font-bold">Logs</h2>
                        <p className="text-4xl">{totalLogs}</p>
                    </div>
                </div>
                <div className="card bg-blue-500 text-white rounded-lg p-8 shadow-lg flex items-center">
                    <FaExclamationTriangle className="text-6xl mr-4" />
                    <div>
                        <h2 className="text-2xl font-bold">Events</h2>
                        <p className="text-4xl">{totalEvents}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}