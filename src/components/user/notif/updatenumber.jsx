import React, { useState } from 'react';
import { userUpdateNumber } from '../../../apiServices';

const ManageNotificationNumbers = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const authToken = localStorage.getItem('token');

  const validateNumber = (name, value) => {
    let error = '';
    if (!value.startsWith('08')) {
      error = 'Number must start with 08';
    } else if (!/^\d+$/.test(value)) {
      error = 'Number must be numeric';
    } else if (value.length < 11 || value.length > 13) {
      error = 'Number must be between 11 and 13 characters';
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    validateNumber(name, value);
  };

  const handleUpdate = async (numberKey) => {
    if (errors[numberKey]) {
      alert(`Error: ${errors[numberKey]}`);
      return;
    }

    try {
      await userUpdateNumber({ [numberKey]: data[numberKey] }, authToken);
      setSuccessMessage(`${numberKey} updated successfully`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error(`Error updating ${numberKey}`, error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 border border-blue-300">
        <h2 className="text-2xl mb-4">Manage Notification Numbers</h2>
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}
        <div className="flex justify-between">
          {Object.keys(data)
            .filter((key) => key.startsWith('nomor'))
            .map((numberKey, index) => (
              <div key={index} className="w-1/3 px-4">
                <div className="mb-4">
                  <label
                    htmlFor={numberKey}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    {`Number ${index + 1}`}
                  </label>
                  <input
                    type="text"
                    id={numberKey}
                    name={numberKey}
                    value={data[numberKey]}
                    onChange={handleChange}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors[numberKey] ? 'border-red-500' : 'border-blue-300'
                    }`}
                  />
                  {errors[numberKey] && (
                    <p className="text-red-500 text-xs italic">
                      {errors[numberKey]}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleUpdate(numberKey)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  disabled={
                    data[numberKey] === initialData[numberKey] ||
                    Boolean(errors[numberKey])
                  }
                >
                  Change
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageNotificationNumbers;
