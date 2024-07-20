import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  getUserDevices,
  userDeleteDevice,
  userAddDevice,
  userUpdateDevice,
  tailGetData // Import the tailGetData function
} from "../../../apiServices";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Spinner = () => (
  <div className="flex items-center justify-center h-24 mt-4">
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    <span className="ml-4 text-blue-500">Loading data...</span>
  </div>
);

const KeyModal = ({ show, onClose, urlKey }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-lg mb-2 text-center">Device Created</h2>
        <p className="mb-4">Setting this key on device initialization:</p>
        <div className="bg-gray-200 p-2 rounded mb-4">{urlKey}</div>
        <div className="flex justify-center mb-4">
          <QRCodeSVG value={`http://192.168.4.1/wifi?key=${urlKey}`} size={128} level="Q" className="border-2 border-gray-400" />
        </div>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ErrorModal = ({ show, onClose, errorMessage }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-lg mb-2 text-red-600 text-center">Error</h2>
        <p className="mb-4">{errorMessage}</p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white p-2 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Device = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [urlKey, setUrlKey] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    fetchDevices(authToken);
  }, [authToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      devices.forEach((device) => {
        fetchCurrentPPM(device.deviceNumber);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [devices]);

  const fetchDevices = async (authToken) => {
    setLoading(true);
    const response = await getUserDevices(authToken);
    setDevices(response.data);
    setLoading(false);
  };

  const fetchCurrentPPM = async (deviceNumber) => {
    try {
      const response = await tailGetData(authToken, deviceNumber);
      const updatedDevices = devices.map((device) => {
        if (device.deviceNumber === deviceNumber) {
          return { ...device, ppm: response.data[0] ? response.data[0].ppm : 0 };
        }
        return device;
      });
      setDevices(updatedDevices);
    } catch (error) {
      console.error("Error fetching current PPM value", error);
    }
  };

  const handleCreateDevice = async () => {
    try {
      const response = await userAddDevice(newDeviceName, authToken);
      if (response.status === 400) {
        setErrorMessage(response.message);
      } else {
        setUrlKey(response.key);
        fetchDevices(authToken);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
    setShowCreateModal(false);
    setNewDeviceName("");
  };

  const handleDeleteDevice = async (deviceId) => {
    await userDeleteDevice(deviceId, authToken);
    fetchDevices(authToken);
  };

  const handleUpdateDevice = async () => {
    const response = await userUpdateDevice(currentDevice.id, newDeviceName, authToken);
    setUrlKey(response.urlKey);
    fetchDevices(authToken);
    setShowUpdateModal(false);
    setCurrentDevice(null);
    setNewDeviceName("");
  };

  return (
    <div className="p-4 md:pt-0 pt-16">
      <h1 className="text-xl font-semibold mb-4">Device Management</h1>
      <button
        onClick={() => setShowCreateModal(true)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Create Device
      </button>

      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg mb-2 text-center">Create Device</h2>
            <input
              type="text"
              value={newDeviceName}
              onChange={(e) => setNewDeviceName(e.target.value)}
              className="border p-2 mb-2 w-full border-blue-300"
              placeholder="Device Name"
            />
            <button
              onClick={handleCreateDevice}
              className="bg-green-500 text-white p-2 rounded"
            >
              Create
            </button>
            <button
              onClick={() => setShowCreateModal(false)}
              className="bg-red-500 text-white p-2 rounded ml-2 mx-auto "
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="mt-4 flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="mt-4">
          {devices.map((device) => (
            <div key={device.id} className="border p-4 rounded mb-2 flex justify-between items-center w-96 shadow-md border-blue-300">
              <div>
                <h3>Nama: {device.deviceName}</h3>
                <p>Device Number: {device.deviceNumber}</p>
                <p>Created: {new Date(device.createdAt).toLocaleString()}</p>
                <div className="mt-2 w-32 h-32">
                  <CircularProgressbar
                    value={device.ppm || 0}
                    text={`${device.ppm || 0} PPM`}
                    minValue={0}
                    maxValue={100}
                    styles={buildStyles({
                      pathColor: `rgba(30 , 64, 175, 0.99, ${device.ppm / 200})`,
                      textColor: '#000',
                      textSize: '16px',
                      trailColor: '#d6d6d6',
                      backgroundColor: '#3e98c7',
                    })}
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={() => {
                    setCurrentDevice(device);
                    setNewDeviceName(device.deviceName);
                    setShowUpdateModal(true);
                  }}
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteDevice(device.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md border-blue-300">
            <h2 className="text-lg mb-2">Update Device</h2>
            <input
              type="text"
              value={newDeviceName}
              onChange={(e) => setNewDeviceName(e.target.value)}
              className="border p-2 mb-2 w-full border-blue-300"
              placeholder="Device Name"
            />
            <button
              onClick={handleUpdateDevice}
              className="bg-green-500 text-white p-2 rounded"
            >
              Update
            </button>
            <button
              onClick={() => setShowUpdateModal(false)}
              className="bg-red-500 text-white p-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <KeyModal show={!!urlKey} onClose={() => setUrlKey(null)} urlKey={urlKey} />
      <ErrorModal show={!!errorMessage} onClose={() => setErrorMessage(null)} errorMessage={errorMessage} />
    </div>
  );
};

export default Device;
