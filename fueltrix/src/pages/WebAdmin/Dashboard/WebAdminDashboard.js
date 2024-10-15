// src/App.js
import React from 'react';
import './WebAdminDashboard.css'; // Import CSS styles

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">Admin Dashboard</div>
            <ul className="sidebar-menu">
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">Users</a></li>
                <li><a href="#">Settings</a></li>
                <li><a href="#">Reports</a></li>
                <li><a href="#">Logout</a></li>
            </ul>
        </aside>
    );
};

const Header = () => {
    return (
        <header className="AdminDashboardheader">
            <h1>Welcome to the Admin Dashboard</h1>
        </header>
    );
};

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <section className="stats">
                    <div className="stat-card">
                        <h2>Total Users</h2>
                        <p>1500</p>
                    </div>
                    <div className="stat-card">
                        <h2>Active Sessions</h2>
                        <p>75</p>
                    </div>
                    <div className="stat-card">
                        <h2>Pending Reports</h2>
                        <p>5</p>
                    </div>
                </section>
                <section className="recent-activities">
                    <h2>Recent Activities</h2>
                    <ul>
                        <li>User John Doe logged in</li>
                        <li>User Jane Smith created a report</li>
                        <li>User Alice Johnson logged out</li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <Dashboard />
        </div>
    );
}

export default App;
