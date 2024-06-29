import React, { useState, useEffect } from 'react';
import { getDataByDevice, getUserDevices } from '../../../apiServices';

const DeviceDataViewer = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [deviceData, setDeviceData] = useState(null);
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getUserDevices(authToken);
        setDevices(response.data);  // Adjust this line based on the actual structure of the response
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, [authToken]);

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  const handleGetData = async () => {
    try {
      const response = await getDataByDevice(selectedDevice, authToken);
      setDeviceData(response.data);  // Adjust this line based on the actual structure of the response
    } catch (error) {
      console.error('Error fetching device data:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">View Device Data</h2>
      <div className="mb-4">
        <select
          className="p-2 border border-gray-300 rounded-md w-96"
          value={selectedDevice}
          onChange={handleDeviceChange}
        >
          <option value="">Select a device</option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.deviceName}
            </option>
          ))}
        </select>
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        onClick={handleGetData}
      >
        Get Data
      </button>
      {deviceData && (
        <div className="mt-6 bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-2">Device Data</h3>
          <pre className="bg-gray-100 p-2 rounded-md">
            {JSON.stringify(deviceData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DeviceDataViewer;
