import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getDataGroupLocation, getUserNotifications, downloadUserNotif } from '../../../apiServices';
import L from 'leaflet';

const customicon = new L.Icon({
  iconUrl: require('../../../assets/pointer.png'),
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const DeviceDataViewer = () => {
  const [deviceData, setDeviceData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deviceResponse = await getDataGroupLocation(authToken);
        if (deviceResponse.status === 200) {
          setDeviceData(deviceResponse.data);
        }

        const notificationResponse = await getUserNotifications(authToken);
        if (notificationResponse.status === 200) {
          setNotifications(notificationResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  const handleDownloadReport = async () => {
    try {
      await downloadUserNotif(authToken);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className='text-xl font-semibold mb-4'>Event History</h2>
        <button
          className="bg-blue-500 px-4 py-2 rounded"
          onClick={handleDownloadReport}
        >
          Download Report
        </button>
      </div>
      <div className="bg-gray-200 p-4 mb-4 rounded border border-blue-300">
        {loading ? (
        <div className="flex items-center justify-center h-24 mt-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="ml-4 text-blue-500">Loading data...</span>
        </div>
        ) : notifications ? (
          notifications.map((notification, index) => (
            <div key={index} className="bg-gray-300 h-6 my-2 rounded"></div>
          ))
        ) : (
          <div className="bg-white p-4 text-center rounded shadow">
            No Data
          </div>
        )}
      </div>
      <h2 className='text-xl font-semibold mb-4'>Event Area</h2>
      <div className="bg-gray-200 p-4 rounded border border-blue-300">
        {loading ? (
        <div className="flex items-center justify-center h-24 mt-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="ml-4 text-blue-500">Loading data...</span>
        </div>
        ) : deviceData.length > 0 ? (
          <MapContainer
            center={[-6.91173, 109.129387]}
            zoom={12}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {deviceData.map((device, index) => (
              <Marker key={index} position={device.location} icon={customicon}>
                <Popup>
                  <pre>{JSON.stringify(device.items, null, 2)}</pre>
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
