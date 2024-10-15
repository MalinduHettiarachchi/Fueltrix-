// src/App.js
import './WebAdminDashboard.css'; // Import CSS styles
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom'; // Import necessary components from react-router-dom

const Sidebar = ({ onChangeView }) => {
    const navigate = useNavigate(); // Get navigate function

    const handleLogout = () => {
        // Clear user-related data (e.g., tokens)
        localStorage.removeItem('authToken'); // Assuming auth token is stored in localStorage
        sessionStorage.clear(); // Clear session storage if used
        
        // Redirect to login page
        navigate('/webAdminLogin'); // Use navigate for redirection
    };

    return (
        <aside className="webadmin-sidebar">
            <div className="webadmin-sidebar-brand">
                <i className="fas fa-cog"></i> Admin Dashboard
            </div>
            <ul className="webadmin-sidebar-menu">
                <li><a href="#" onClick={() => onChangeView('shedRequests')}><i className="fas fa-warehouse"></i> Shed Registration Requests</a></li>
                <li><a href="#" onClick={() => onChangeView('companyRequests')}><i className="fas fa-building"></i> Company Registration Requests</a></li>
                <li><a href="#" onClick={() => onChangeView('registeredSheds')}><i className="fas fa-industry"></i> Registered Sheds</a></li>
                <li><a href="#" onClick={() => onChangeView('registeredCompanies')}><i className="fas fa-building"></i> Registered Companies</a></li>
                <li><a href="#" onClick={() => onChangeView('companyVehicles')}><i className="fas fa-truck"></i> Company Vehicles</a></li>
                <li><a href="#" onClick={() => onChangeView('driverManagement')}><i className="fas fa-user-tie"></i> Driver Management</a></li>
                <li><a href="#" onClick={() => onChangeView('pumpAssistantManagement')}><i className="fas fa-gas-pump"></i> Pump Assistant Management</a></li>
                <li><a href="#" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</a></li>
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

const ShedRequests = () => {
    const [shedRequests, setShedRequests] = useState([]); // State to store shed requests
    const [loading, setLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        const fetchShedRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/shed-requests'); // Update with your server URL
                setShedRequests(response.data); // Set the received data to state
                setLoading(false); // Set loading to false
            } catch (error) {
                console.error('Error fetching shed requests:', error);
                setLoading(false); // Set loading to false even on error
            }
        };

        fetchShedRequests();
    }, []); // Empty dependency array to run once on mount

    if (loading) {
        return <p>Loading shed requests...</p>; // Loading state
    }

    return (
        <div className="ShedRequest">
            <h1>Shed Registration Requests</h1>
            {shedRequests.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Shed Register Number</th>
                            <th>Shed Name</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Security Key</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
    {shedRequests.map(request => (
        <tr key={request.id}>
            <td>{request.shedRegisterNumber}</td>
            <td>{request.shedName}</td>
            <td>{request.email}</td>
            <td>{request.location}</td>
            <td>{request.Security_Key}</td>
            <td>
                {request.createdAt 
                    ? (request.createdAt.toDate ? request.createdAt.toDate().toString() : new Date(request.createdAt).toString()) 
                    : 'N/A'}
            </td>
        </tr>
    ))}
</tbody>

                </table>
            ) : (
                <p>No shed registration requests found.</p>
            )}
        </div>
    );
};



// Add other components for different views if needed
const CompanyRequests = () => <div>Company Registration Requests Content</div>;
const RegisteredSheds = () => <div>Registered Sheds Content</div>;
const RegisteredCompanies = () => <div>Registered Companies Content</div>;
const CompanyVehicles = () => <div>Company Vehicles Content</div>;
const DriverManagement = () => <div>Driver Management Content</div>;
const PumpAssistantManagement = () => <div>Pump Assistant Management Content</div>;

const Dashboard = () => {
    const [currentView, setCurrentView] = useState('dashboard'); // State to manage current view

    const renderContent = () => {
        switch (currentView) {
            case 'shedRequests':
                return <ShedRequests />;
            case 'companyRequests':
                return <CompanyRequests />;
            case 'registeredSheds':
                return <RegisteredSheds />;
            case 'registeredCompanies':
                return <RegisteredCompanies />;
            case 'companyVehicles':
                return <CompanyVehicles />;
            case 'driverManagement':
                return <DriverManagement />;
            case 'pumpAssistantManagement':
                return <PumpAssistantManagement />;
            default:
                return (
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
                );
        }
    };

    return (
        <div className="webadmin-dashboard-container">
            <Sidebar onChangeView={setCurrentView} />
            <main className="webadmin-main-content">
                <Header />
                {renderContent()}
               
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
