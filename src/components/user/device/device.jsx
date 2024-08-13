import React, { useState, useEffect } from "react";
import {
  getUserDevices,
  userDeleteDevice,
  userAddDevice,
  userUpdateDevice,
  tailGetData,
  updateInterval
} from "../../../apiServices";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import QrScanner from 'react-qr-scanner';

const Spinner = () => (
  <div className="flex items-center justify-center h-24 mt-4">
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    <span className="ml-4 text-blue-500">Loading data...</span>
  </div>
);

const SuccessModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-lg mb-2 text-center">Success</h2>
        <p className="mb-4 text-center">The device has been created successfully!</p>
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

const FailedModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-lg mb-2 text-red-600 text-center">Failed</h2>
        <p className="mb-4 text-center">Device key already used.</p>
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

const IntervalSuccessModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-lg mb-2 text-center">Success</h2>
        <p className="mb-4 text-center">Interval successfully changed!</p>
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

const Device = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFetchInterval, setSelectedFetchInterval] = useState(5000);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showIntervalSuccessModal, setShowIntervalSuccessModal] = useState(false);
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
    }, selectedFetchInterval);
    return () => clearInterval(interval);
  }, [devices, selectedFetchInterval]);

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
    if (!newDeviceName || !qrCode) {
      setErrorMessage("All fields must be filled.");
      return;
    }
    try {
      const response = await userAddDevice(newDeviceName, qrCode, authToken);
      if (response.status === 400 && response.message === 'Device key already used') {
        setShowFailedModal(true);
      } else if (response.status === 400) {
        setErrorMessage(response.message);
      } else {
        setShowSuccessModal(true);
        fetchDevices(authToken);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
    setShowCreateModal(false);
    setNewDeviceName("");
    setQrCode("");
    setShowQrScanner(false);
  };

  const handleDeleteDevice = async (deviceId) => {
    await userDeleteDevice(deviceId, authToken);
    fetchDevices(authToken);
  };

  const handleUpdateDevice = async () => {
    await userUpdateDevice(currentDevice.id, newDeviceName, authToken);
    setShowSuccessModal(true);
    fetchDevices(authToken);
    setShowUpdateModal(false);
    setCurrentDevice(null);
    setNewDeviceName("");
  };

  const handleScan = (data) => {
    if (data) {
      setQrCode(data.text);
      setShowQrScanner(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleIntervalChange = async (device, newInterval) => {
    try {
      await updateInterval(device.id, newInterval, authToken);
      const updatedDevices = devices.map((d) =>
        d.deviceNumber === device.deviceNumber ? { ...d, interval: newInterval } : d
      );
      setDevices(updatedDevices);
      setShowIntervalSuccessModal(true);
    } catch (error) {
      console.error("Error updating interval", error);
    }
  };

  return (
    <div className="p-4 md:pt-0 pt-16">
      <h1 className="text-xl font-semibold mb-4">Device Management</h1>
      <div className="flex items-center mb-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Device
        </button>
        <label className="block mb-0 ml-2 text-sm font-semibold mr-2">PPM Refresh:</label>
        <select
          value={selectedFetchInterval}
          onChange={(e) => setSelectedFetchInterval(parseInt(e.target.value))}
          className="border p-2 rounded bg-blue-500 text-white"
        >
          {[5000, 10000, 15000, 20000, 25000, 30000].map((value) => (
            <option key={value} value={value}>
              {value / 1000} seconds
            </option>
          ))}
        </select>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg mb-2 text-center">Create Device</h2>
            <input
              type="text"
              value={newDeviceName}
              onChange={(e) => setNewDeviceName(e.target.value)}
              className="border p-2 mb-2 w-full border-blue-300"
              placeholder="Device Name"
            />
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                className="border p-2 w-full border-blue-300"
                placeholder="Device Code"
              />
              <button
                onClick={() => setShowQrScanner(!showQrScanner)}
                className="bg-blue-500 text-white p-2 rounded ml-2"
              >
                {showQrScanner ? 'Close Camera' : 'Scan QR'}
              </button>
            </div>
            {showQrScanner && (
              <div className="mb-2 flex justify-center">
                <QrScanner
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%', maxWidth: '300px' }}
                  constraints={{ video: { facingMode: 'environment' } }}
                />
              </div>
            )}
            <button
              onClick={handleCreateDevice}
              className="bg-green-500 text-white p-2 rounded"
            >
              Create
            </button>
            <button
              onClick={() => setShowCreateModal(false)}
              className="bg-red-500 text-white p-2 rounded ml-2"
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
                <div className="mt-2">
                  <label className="block mb-1 text-sm">Device Send Interval:</label>
                  <select
                    value={device.interval || 10}
                    onChange={(e) => handleIntervalChange(device, parseInt(e.target.value))}
                    className="border p-2 rounded w-full"
                  >
                    {[5, 10, 15, 20, 25, 30].map((value) => (
                      <option key={value} value={value}>
                        {value} seconds
                      </option>
                    ))}
                  </select>
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

      <SuccessModal show={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      <FailedModal show={showFailedModal} onClose={() => setShowFailedModal(false)} />
      <ErrorModal show={!!errorMessage} onClose={() => setErrorMessage(null)} errorMessage={errorMessage} />
      <IntervalSuccessModal show={showIntervalSuccessModal} onClose={() => setShowIntervalSuccessModal(false)} />
    </div>
  );
};

export default Device;
