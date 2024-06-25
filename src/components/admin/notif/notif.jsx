import React, { useEffect, useState } from "react";
import { getNoDamkar, putNoDamkar } from "../../../apiServices";
import Swal from "sweetalert2";

const Notif = () => {
    const [noDamkar, setNoDamkar] = useState('');
    const [formData, setFormData] = useState({ nomor: '' });
    const authToken = localStorage.getItem('token');

    useEffect(() => {
        const fetchNoDamkar = async () => {
            try {
                const response = await getNoDamkar(authToken);
                setNoDamkar(response.data.nomor);
            } catch (error) {
                console.error('Error fetching data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error fetching data',
                });
            }
        };

        fetchNoDamkar();
    }, [authToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await putNoDamkar(authToken, formData.nomor);
            if (response.message === "Nomor updated") {
                setNoDamkar(formData.nomor);
                Swal.fire({
                    icon: 'success',
                    title: 'Number updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message || 'Error updating number',
                });
            }
        } catch (error) {
            console.error('Error updating number:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error updating number',
            });
        }
        
    };

    const handleChange = (e) => {
        setFormData({ ...formData, nomor: e.target.value });
    };

    return (
        <div className="mt-20 md:mt-8 px-2">
            <h2 className="text-2xl font-bold mb-4 flex justify-center">Admin Damkar Settings</h2>
            <form onSubmit={handleSubmit} className="bg-slate-400 p-4 rounded shadow-md max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="no_damkar" className="block text-gray-700">Number</label>
                    <input
                        type="number"
                        placeholder={noDamkar}
                        id="no_damkar"
                        name="no_damkar"
                        value={formData.nomor}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default Notif;
