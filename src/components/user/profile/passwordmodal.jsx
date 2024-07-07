import React from 'react';

const PasswordChangeModal = ({ isOpen, onClose, onSubmit, formData, handleChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="oldpassword" className="block text-gray-700 text-sm font-bold mb-2">Old Password</label>
            <input
              type="password"
              id="oldpassword"
              name="oldpassword"
              value={formData.oldpassword}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newpassword" className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
            <input
              type="password"
              id="newpassword"
              name="newpassword"
              value={formData.newpassword}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="reNewPassword" className="block text-gray-700 text-sm font-bold mb-2">Re-enter New Password</label>
            <input
              type="password"
              id="renewpassword"
              name="renewpassword"
              value={formData.renewpassword}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
