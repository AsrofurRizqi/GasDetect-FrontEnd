import React, { useState, useEffect } from "react";
import Home from "../../components/user/home";
import { getUserDevices, getData, getUserNotifications, downloadData } from "../../apiServices";

const DashboardAdmin = () => {
    const [totalDevices, setTotalDevices] = useState(0);
    const [totalReports, setTotalReports] = useState(0);
    const [totalLogs, setTotalLogs] = useState(0);
    const [totalEvents, setTotalEvents] = useState(0);
    const [loading, setLoading] = useState(true);
    const authToken = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const devicesResponse = await getUserDevices(authToken);
                const logsResponse = await getData(authToken);
                const reportsResponse = await getUserNotifications(authToken);
                //const eventsResponse = await downloadData(authToken);

                setTotalDevices(devicesResponse.data.length || 0);
                setTotalReports(reportsResponse.data ? reportsResponse.data.count : 0);
                setTotalLogs(logsResponse.data ? logsResponse.data.count : 0);
                setTotalEvents(0);
            } catch (error) {
                console.error('Error fetching data:', error);
                setTotalDevices(0);
                setTotalReports(0);
                setTotalLogs(0);
                setTotalEvents(0);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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
        <div className="dashboard">
            <div className="content h-screen">
                <div className="justify-center p-4">
                    <h1 className="text-2xl font-semibold text-center">Welcome</h1>
                    <h1 className="text-2xl font-semibold text-center">User Dashboard</h1>
                </div>
                <Home totalDevices={totalDevices} totalReports={totalReports} totalLogs={totalLogs} totalEvents={totalEvents} />
            </div>
        </div>
    );
}

export default DashboardAdmin;
