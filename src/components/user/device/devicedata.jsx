import React, { useState, useEffect } from 'react';
import { getDataByDevice, getUserDevices } from '../../../apiServices';

const DeviceDataViewer = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [deviceData, setDeviceData] = useState(null);
  const [loadingDevices, setLoadingDevices] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const authToken = localStorage.getItem('token');

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
      setDeviceData(response.data);
    } catch (error) {
      console.error('Error fetching device data:', error);
    } finally {
      setLoadingData(false);
    }
  };

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
                {device.deviceName}
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
        deviceData && (
          <div className="mt-6 bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Device Data</h3>
            <pre className="bg-gray-100 p-2 rounded-md">
              {JSON.stringify(deviceData, null, 2)}
            </pre>
          </div>
        )
      )}
    </div>
  );
};

export default DeviceDataViewer;
