import React, { useState, useEffect } from "react";
import Home from "../../components/admin/home";

import { adminGetUsers, adminGetDevices, adminGetReports } from "../../apiServices";

const DashboardAdmin = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalDevices, setTotalDevices] = useState(0);
    console.log(totalDevices);
    const [totalReports, setTotalReports] = useState(0);

    useEffect(() => {
        const authToken = localStorage.getItem("token");

        const fetchUsers = async () => {
            try {
                const response = await adminGetUsers(authToken);
                //admin tidak dihitung
                setTotalUsers(response.data.length - 1);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const fetchDevices = async () => {
            try {
                const response = await adminGetDevices(authToken);
                console.log(response);
                setTotalDevices(response.data.length);
            } catch (error) {
                console.error("Error fetching devices:", error);
            }
        };

        const fetchReports = async () => {
            try {
                const response = await adminGetReports(authToken);
                setTotalReports(response.data.count);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchUsers();
        fetchDevices();
        fetchReports();
    }, []);

    return (
        <div className="dashboard">
            <div className="justify-center p-4">
                    <h1 className="text-2xl font-semibold text-center">Welcome</h1>
                    <h1 className="text-2xl font-semibold text-center">Admin Dashboard</h1>
                </div>
            <div className="content h-screen">
                <Home totalUsers={totalUsers} totalDevices={totalDevices} totalReports={totalReports} />
            </div>
        </div>
    );
}

export default DashboardAdmin;
