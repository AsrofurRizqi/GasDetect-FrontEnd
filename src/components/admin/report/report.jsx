import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { adminGetReports } from '../../../apiServices';
import L from 'leaflet';

const customicon = new L.Icon({
  iconUrl: require('../../../assets/pointer.png'),
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const DeviceDataViewer = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const authToken = localStorage.getItem('token');
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {

        const notificationResponse = await adminGetReports(authToken);
        if (notificationResponse.status === 200) {
          setNotifications(notificationResponse);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil((notifications.data?.rows.length || 0) / itemsPerPage);
  const currentItems = notifications.data?.rows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-4 md:pt-0 pt-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className='text-xl font-semibold mb-4'>User Event History</h2>
      </div>
      <div className="bg-gray-200 p-4 mb-4 rounded border border-blue-300">
        {loading ? (
          <div className="flex items-center justify-center h-24 mt-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <span className="ml-4 text-blue-500">Loading data...</span>
          </div>
        ) : notifications.data ? (
          <>
            {currentItems.map((notification, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 my-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700 font-semibold">Status: <span className="text-blue-500">{notification.status}</span></p>
                    <p className="text-gray-500">User: {notification.user_notification.username}</p>
                    <p className="text-gray-500">Location: {notification.location}</p>
                    <p className="text-gray-400 text-sm">Time: {new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jakarta', dateStyle: 'medium', timeStyle: 'long', hourCycle: 'h23' }).format(new Date(notification.createdAt))}</p>
                  </div>
                </div>
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
          </>
        ) : (
          <div className="bg-white p-4 text-center rounded shadow">
            No Data
          </div>
        )}
      </div>
      <h2 className='text-xl font-semibold mb-4'>User Event Area</h2>
      <div className="bg-gray-200 p-4 rounded border border-blue-300">
        {loading ? (
          <div className="flex items-center justify-center h-24 mt-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <span className="ml-4 text-blue-500">Loading data...</span>
          </div>
        ) : notifications.data  ? (
          <MapContainer
            center={[-6.91173, 109.129387]}
            zoom={12}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {notifications.data.rows.map((device, index) => (
              <Marker key={index} position={device.location.split(",")} icon={customicon}>
                <Popup>
                  <pre>{device.user_notification.username}|{device.location}|{device.status}|{new Date(device.createdAt).toLocaleDateString()}</pre>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div className="bg-white p-4 text-center rounded shadow">
            No Data
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceDataViewer;
