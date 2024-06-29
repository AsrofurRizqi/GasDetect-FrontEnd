import React, { useState, useEffect } from "react";
import Home from "../../components/user/home";
import Banner from "../../components/banner";
import Footer from "../../components/footer";
const { getUserDevices, getData, getUserNotifications, donwloadData } = require("../../apiServices");

const DashboardAdmin = () => {
    const [totalDevices, setTotalDevices] = useState(0);
    const [totalReports, setTotalReports] = useState(0);
    const [totalLogs, setTotalLogs] = useState(0);
    const [totalEvents, setTotalEvents] = useState(0);


    useEffect(() => {
        const devices = JSON.parse(localStorage.getItem('devices')) || [];
        const reports = JSON.parse(localStorage.getItem('reports')) || [];
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        const events = JSON.parse(localStorage.getItem('events')) || [];

        setTotalDevices(devices.length);
        setTotalReports(reports.length);
        setTotalLogs(logs.length);
        setTotalEvents(events.length);
    }, []);

    return (
        <div className="dashboard">
            <div className="content h-screen">
                <Home totalDevices={totalDevices} totalReports={totalReports} totalLogs={totalLogs} totalEvents={totalEvents} />
            </div>
            <Banner />
            <Footer />
        </div>
    );
}

export default DashboardAdmin;
