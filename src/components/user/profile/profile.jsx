import React, { useState, useEffect } from 'react';
import { getProfile, changeProfile, changePassword } from '../../../apiServices';

const Profile = () => {
  const authToken = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      updatedData.append('name', formData.name);
      updatedData.append('email', formData.email);
      updatedData.append('phone', formData.phone);
      if (profileImage) {
        updatedData.append('profile_image', profileImage);
      }
      if (formData.password) {
        updatedData.append('password', formData.password);
      }
      await changeProfile(authToken, updatedData);
      setAlertMessage('Profile updated successfully!');
      setAlertType('success');
      setFormData({ ...formData, password: '' });
      setProfileImage(null);
      fetchProfileData(); // Fetch updated profile data
    } catch (error) {
      console.error('Error updating profile:', error);
      setAlertMessage('Failed to update profile.');
      setAlertType('error');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      if (formData.password) {
        await changePassword(authToken, formData.password);
        setAlertMessage('Password changed successfully!');
        setAlertType('success');
        setFormData({ ...formData, password: '' });
      } else {
        setAlertMessage('Please enter a new password.');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setAlertMessage('Failed to change password.');
      setAlertType('error');
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await getProfile(authToken);
      setProfileData(response.data);
      setFormData({
        name: response.data.username,
        email: response.data.email,
        phone: response.data.phone,
        password: '',
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setProfileData({});
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchProfileData();
    }
  }, [authToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <span className="ml-4 text-blue-500">Loading Data...</span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 pr-0 md:pr-8 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Change Profile Data</h2>
          {alertMessage && (
            <div className={`mb-4 p-4 rounded ${alertType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {alertMessage}
            </div>
          )}
          <form onSubmit={handleProfileUpdate}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="profile_image"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="profile_image"
                name="profile_image"
                onChange={handleProfileImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 w-full md:w-auto"
                placeholder="Change Password"
              />
              <button
                onClick={handlePasswordChange}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Change
              </button>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
            >
              Update Profile
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="w-48 h-48 rounded-full border border-blue-500 flex items-center justify-center mb-4 overflow-hidden">
            {profileData.profile_image ? (

              <img src={`https://api.kuroshop.my.id/${profileData.profile_image}`} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
