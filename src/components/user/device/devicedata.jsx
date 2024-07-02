import React, { useState, useEffect } from 'react';
import { getDataByDevice, getUserDevices } from '../../../apiServices';

const DeviceDataViewer = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [deviceData, setDeviceData] = useState([]);
  const [loadingDevices, setLoadingDevices] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const authToken = localStorage.getItem('token');
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getUserDevices(authToken);
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      } finally {
        setLoadingDevices(false);
      }
    };

    fetchDevices();
  }, [authToken]);

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  const handleGetData = async () => {
    setLoadingData(true);
    try {
      const response = await getDataByDevice(selectedDevice, authToken);
      const flattenedData = response.data.flatMap(locationData => 
        locationData.items.map(item => ({ ...item, location: locationData.location }))
      );
      setDeviceData(flattenedData);
      setCurrentPage(1); // Reset to the first page when new data is loaded
    } catch (error) {
      console.error('Error fetching device data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(deviceData.length / itemsPerPage);
  const currentItems = deviceData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">View Device Data</h2>
      {loadingDevices ? (
        <div className="flex items-center justify-center h-24">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="ml-4 text-blue-500">Loading devices...</span>
        </div>
      ) : (
        <div className="mb-4">
          <select
            className="p-2 border border-blue-300 rounded-md w-96"
            value={selectedDevice}
            onChange={handleDeviceChange}
          >
            <option value="">Select a device name</option>
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.deviceName} - {device.deviceNumber}
              </option>
            ))}
          </select>
        </div>
      )}
      <button
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        onClick={handleGetData}
        disabled={loadingData}
      >
        {loadingData ? 'Loading...' : 'Get Data'}
      </button>
      {loadingData ? (
        <div className="flex items-center justify-center h-24 mt-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="ml-4 text-blue-500">Loading data...</span>
        </div>
      ) : (
        deviceData.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Device Data</h3>
            {currentItems.map((data, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md mb-4 border border-blue-300">
                <p><strong>Location:</strong> {data.location.join(', ')}</p>
                <p><strong>Device Time:</strong> {data.timestamp}</p>
                <p><strong>Server Time:</strong> {new Date(data.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hourCycle: 'h23' })}</p>
                <p><strong>PPM:</strong> {data.ppm}</p>
                <p><strong>Temperature:</strong> {data.temperature}°C</p>
                <p><strong>Humidity:</strong> {data.humidity}</p>
                <p><strong>Status:</strong> {data.status}</p>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DeviceDataViewer;
