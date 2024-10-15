// src/App.js
import React from 'react';
import './WebAdminDashboard.css'; // Import CSS styles

const Sidebar = () => {
    return (
        <aside className="webadmin-sidebar">
            <div className="webadmin-sidebar-brand">Admin Dashboard</div>
            <ul className="webadmin-sidebar-menu">
                <li><a href="#">Shed Registration Requests</a></li>
                <li><a href="#">Company Registration Requests</a></li>
                <li><a href="#">Registered Sheds</a></li>
                <li><a href="#">Registered Companies</a></li>
                <li><a href="#">Company Vehicles</a></li>
                <li><a href="#">Driver Management</a></li>
                <li><a href="#">Pump Assistant Management</a></li>
                <li><a href="#">Logout</a></li>
            </ul>
        </aside>
    );
};

const Header = () => {
    return (
        <header className="webadmin-dashboard-header">
            <h1>Welcome to the Admin Dashboard</h1>
        </header>
    );
};

const Dashboard = () => {
    return (
        <div className="webadmin-dashboard-container">
            <Sidebar />
            <main className="webadmin-main-content">
                <Header />
                <section className="webadmin-stats">
                    <div className="webadmin-stat-card">
                        <h2>Pending Shed Requests</h2>
                        <p>20 pending</p>
                    </div>
                    <div className="webadmin-stat-card">
                        <h2>Total Registered Companies</h2>
                        <p>45 companies</p>
                    </div>
                    <div className="webadmin-stat-card">
                        <h2>Total Registered Sheds</h2>
                        <p>30 sheds</p>
                    </div>
                    <div className="webadmin-stat-card">
                        <h2>Total Company Vehicles</h2>
                        <p>150 vehicles</p>
                    </div>
                    <div className="webadmin-stat-card">
                        <h2>Total Drivers</h2>
                        <p>85 drivers</p>
                    </div>
                    <div className="webadmin-stat-card">
                        <h2>Total Pump Assistants</h2>
                        <p>50 assistants</p>
                    </div>
                </section>
                <section className="webadmin-recent-activities">
                    <h2>Recent Activities</h2>
                    <ul>
                        <li>Company ABC registered a new shed</li>
                        <li>Driver John Doe added a vehicle</li>
                        <li>Company XYZ submitted a shed request</li>
                        <li>Pump Assistant Mike updated his shift</li>
                        <li>Company ABC registered 3 new vehicles</li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

function App() {
    return (
        <div className="webadmin-app">
            <Dashboard />
        </div>
    );
}

export default App;
