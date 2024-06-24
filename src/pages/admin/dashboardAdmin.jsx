import React, { useState, useEffect } from "react";
import Home from "../../components/admin/home";
import Banner from "../../components/banner";
import Footer from "../../components/footer";

const DashboardAdmin = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalDevices, setTotalDevices] = useState(0);
    const [totalReports, setTotalReports] = useState(0);

    useEffect(() => {
        // Simulate fetching data from localStorage or an API
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const devices = JSON.parse(localStorage.getItem('devices')) || [];
        const reports = JSON.parse(localStorage.getItem('reports')) || [];

        setTotalUsers(users.length);
        setTotalDevices(devices.length);
        setTotalReports(reports.length);
    }, []);

    return (
        <div className="dashboard">
            <div className="content h-screen">
                <Home totalUsers={totalUsers} totalDevices={totalDevices} totalReports={totalReports} />
            </div>
            <Banner />
            <Footer />
        </div>
    );
}

export default DashboardAdmin;
