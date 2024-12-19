// src/App.js
import './WebAdminDashboard.css'; // Import CSS styles
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom'; // Import necessary components from react-router-dom
import firebase from 'firebase/app';
import 'firebase/firestore';
import { format } from 'date-fns';
import { motion } from 'framer-motion'; // Framer Motion for animations
import styled from 'styled-components'; // styled-components for modern styling
import logo from '../../../img/Fueltixlogo.png'; // Adjust the path according to your folder structure
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 
import { MapContainer, TileLayer, Marker, Popup, Tooltip  } from 'react-leaflet';
import { Icon } from 'leaflet';

import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";


const Sidebar = ({ onChangeView }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userDetails } = location.state || {}; // Retrieve user details

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Assuming auth token is stored in localStorage
        sessionStorage.clear(); // Clear session storage if used
        navigate('/login'); // Redirect to login page
    };

    return (
        <aside className="webadmin-sidebar">
            <div className="webadmin-sidebar-brand">
                <i className="fas fa-cog"></i> Admin Dashboard
            </div>

            {/* Display User Details */}
            {userDetails && (
                <div class="webadmin-user-info">
                <i class="fas fa-user-circle"></i> 
                <p>Welcome, {userDetails.name || "Admin"}</p>
            </div>
           
            )}

            <ul className="webadmin-sidebar-menu">
                <li><a href="#" onClick={() => onChangeView('shedMap')}><i className="fas fa-gas-pump"></i> Filling Station Details</a></li>               
                 <li><a href="#" onClick={() => onChangeView('shedRequests')}><i className="fas fa-warehouse"></i> Filling Station Registration Requests</a></li>
                <li><a href="#" onClick={() => onChangeView('companyRequests')}><i className="fas fa-building"></i> Company Registration Requests</a></li>
                <li><a href="#" onClick={() => onChangeView('registeredSheds')}><i className="fas fa-industry"></i> Registered Filling Station</a></li>
                <li><a href="#" onClick={() => onChangeView('registeredCompanies')}><i className="fas fa-building"></i> Registered Companies</a></li>
                <li><a href="#" onClick={() => onChangeView('companyVehicles')}><i className="fas fa-truck"></i> Company Vehicles</a></li>
                <li><a href="#" onClick={() => onChangeView('driverManagement')}><i className="fas fa-user-tie"></i> Driver Management</a></li>
                <li><a href="#" onClick={() => onChangeView('pumpAssistantManagement')}><i className="fas fa-gas-pump"></i> Pump Assistant Management</a></li>
                <li><a href="#" onClick={() => onChangeView('fuelPriceManage')}><i className="fas fa-dollar-sign"></i> Fuel Price Management</a></li>
                <li><a href="#" onClick={() => onChangeView('contactUsFormManage')}><i className="fas fa-envelope"></i> Contact Us Form Management</a></li>
                <li><a href="#" onClick={() => onChangeView('managePackage')}><i className="fas fa-cubes"></i> Package Management</a></li>
                <li><a href="#" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>
        </aside>
    );
};




const Header = () => {
    
    return (
        <header className="webadmin-dashboard-header">
            <div className="header-content">
                <img src={logo} alt="Logo" className="logo" /> {/* Importing the logo */}
                <h1>Welcome to the Admin Dashboard</h1>
            </div>
        </header>
    );
};







const ShedRequests = () => {
    const [shedRequests, setShedRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchShedRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/shed-requests');
                setShedRequests(response.data);
            } catch (error) {
                console.error('Error fetching shed requests:', error);
                setError('Failed to load shed requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchShedRequests();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.put(`http://localhost:5000/shed-requests/${id}/approve`);
            setShedRequests(prevRequests => prevRequests.filter(request => request.id !== id));
            setSuccess('Shed request approved successfully!');
            setTimeout(() => {
                setSuccess('');
              }, 3000);
        } catch (error) {
            console.error('Error approving shed request:', error);
            setError('Failed to approve shed request.');
        }
    };

    if (loading) {
        return <div className="LoadingMessage">Loading shed requests...</div>;
    }

    if (error) {
        return <div className="ErrorMessage">{error}</div>;
    }

    return (
        <div className="ShedRequest">
            <h1>Filling Station Registration Requests</h1>
            {success && <div className="SuccessMessage">{success}</div>}
            {shedRequests.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Shed Register Number</th>
                            <th>Shed Name</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Shed Type</th>
                            <th>Security Key</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shedRequests.map(request => (
                            <tr key={request.id}>
                                <td>{request.shedRegisterNumber}</td>
                                <td>{request.shedName}</td>
                                <td>{request.email}</td>
                                <td>{request.location}</td>
                                <td>{request.shedType}</td>
                                <td>{request.Security_Key}</td>
                                <td>
                                    {request.createdAt ? (
                                        new Date(request.createdAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: true
                                        }).replace(',', '')
                                    ) : (
                                        'Invalid Date'
                                    )}
                                </td>
                                <td>
                                    <button className='Webapprove' onClick={() => handleApprove(request.id)}>Approve</button>
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



const RegisteredSheds = () => {
    const [sheds, setSheds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApprovedSheds = async () => {
            try {
                const response = await axios.get('http://localhost:5000/approved-sheds');
                setSheds(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching approved sheds');
            } finally {
                setLoading(false);
            }
        };

        fetchApprovedSheds();
    }, []);

    const handleReject = async (shedId) => {
        // SweetAlert2 Confirmation Box
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to reject this shed?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, reject it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Make API call to update the shed's Approved_status to false
                    await axios.put(`http://localhost:5000/reject-shed/${shedId}`, {
                        Approved_status: false,
                    });

                    // Update the UI by setting the shed's Approved_status to false
                    setSheds((prevSheds) =>
                        prevSheds.map((shed) =>
                            shed.id === shedId ? { ...shed, Approved_status: false } : shed
                        )
                    );

                    // Show success message
                    Swal.fire('Rejected!', 'The shed has been rejected.', 'success');
                } catch (err) {
                    console.error('Error rejecting shed:', err);
                    setError('Error rejecting the shed.');
                    Swal.fire('Error', 'There was an error rejecting the shed.', 'error');
                }
            }
        });
    };

    if (loading) return <div className="LoadingMessage">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="registered-sheds">
            <h2 className="title">Registered Filling Station</h2>
            {sheds.length > 0 ? (
                <table className="shed-table">
                    <thead>
                        <tr>
                            <th>Shed Name</th>
                            <th>Register Number</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Shed Type</th>
                            <th>Security Key</th>
                            <th>Approved Status</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sheds.map((shed) => (
                            <tr key={shed.id}>
                                <td>{shed.shedName}</td>
                                <td>{shed.shedRegisterNumber}</td>
                                <td>{shed.email}</td>
                                <td>{shed.location}</td>
                                <td>{shed.shedType}</td>
                                <td>{shed.Security_Key}</td>
                                <td>{shed.Approved_status ? 'Approved' : 'Not Approved'}</td>
                                <td>{shed.createdAt && new Date(shed.createdAt).toLocaleString()}</td>
                                <td>
                                    {shed.Approved_status && (
                                        <button
                                            onClick={() => handleReject(shed.id)}
                                            className="reject-btn"
                                        >
                                            Reject
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No approved sheds found.</p>
            )}
        </div>
    );
};



const PumpAssistantManagement = () => {
    const [pumpAssistants, setPumpAssistants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPumpAssistants = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/pump-assistants');
                setPumpAssistants(response.data);
            } catch (err) {
                console.error('Error fetching pump assistants:', err);
                setError('Failed to fetch pump assistant data.');
            } finally {
                setLoading(false);
            }
        };

        fetchPumpAssistants();
    }, []);

    if (loading) return <div className='LoadingMessage'>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="Pump_Assistant-content"><br/>
            <h1 className='title'>Pump Assistant Management</h1>
            {pumpAssistants.length > 0 ? (
                <table className="pump-assistant-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Filling Station Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pumpAssistants.map((assistant) => (
                            <tr key={assistant.id}>
                                <td>{assistant.firstName}</td>
                                <td>{assistant.lastName}</td>
                                <td>{assistant.email}</td>
                                <td>{assistant.shedName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No pump assistants found.</p>
            )}
        </div>
    );
};


const CompanyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/company-requests');
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching company requests:', error);
                setError('Failed to fetch requests. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleApprove = async (requestId) => {
        try {
            // Clear previous success and error messages
            setSuccess('');
            setError('');

            // Log before making request
            console.log(`Approving request with requestId: ${requestId}`);

            // Approve the request
            const approvalResponse = await axios.post(`http://localhost:5000/api/approve-request/${requestId}`);

            // Log approval response
            console.log('Approval response:', approvalResponse.data);

            // Check if the request approval was successful
            if (approvalResponse.status === 200 && approvalResponse.data.message === 'Request approved successfully') {
                console.log('Request approved successfully!');

                // Set success message
                setSuccess('Request approved successfully!');

                // Update the state to remove the approved request
                setRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));

                // Clear the success message after a delay (optional)
                setTimeout(() => setSuccess(''), 3000); // Hide the message after 3 seconds
            } else {
                throw new Error('Failed to approve request');
            }

        } catch (error) {
            console.error('Error approving request:', error);

            // Log specific error details if available
            if (error.response) {
                console.error('Error details:', error.response.data);
            }

            // Set the error message to be displayed
            setError('Failed to approve the request. Please try again later.');
        }
    };

    if (loading) {
        return <div className="LoadingMessage">Loading...</div>;
    }

    return (
        <div className="Company-Registration-Requests">
            <br />
            <h1>Company Registration Requests</h1>
            
            {/* Display success message */}
            {success && <div className="SuccessMessage">{success}</div>}
            
            {/* Display error message */}
            {error && <div className="ErrorMessage">{error}</div>}

            {requests.length === 0 ? (
                <p>No pending requests found.</p>
            ) : (
                <table className="requests-table">
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Email</th>
                            <th>Package Type</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.company}</td>
                                <td>{request.email}</td>
                                <td>{request.package}</td>
                                <td>{formatDate(request.createdAt)}</td>
                                <td>
                                    <button
                                        className="Webapprove"
                                        onClick={() => handleApprove(request.id)} // Only pass requestId here
                                    >
                                        Approve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// Utility function to format date
const formatDate = (dateString) => {
    if (!dateString) return 'Invalid Date';
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).replace(',', '');
};


const RegisteredCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/registered-companies');
                // Filter for only approved companies
                const approvedCompanies = response.data.filter(company => company.Approved_status === true);
                setCompanies(approvedCompanies);
            } catch (error) {
                console.error('Error fetching registered companies:', error);
                setError('Failed to fetch registered companies. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const handleReject = (companyId) => {
        // Display confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reject it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Proceed to update the status if confirmed
                try {
                    await axios.put(`http://localhost:5000/api/registered-companies/${companyId}`, {
                        Approved_status: false,
                    });
                    setCompanies(prevCompanies => prevCompanies.filter(company => company.id !== companyId));
                    Swal.fire(
                        'Rejected!',
                        'The company has been rejected.',
                        'success'
                    );
                } catch (error) {
                    console.error('Error rejecting company:', error);
                    setError('Failed to reject the company. Please try again later.');
                }
            }
        });
    };

    if (loading) {
        return <div className="LoadingMessage">Loading...</div>;
    }

    if (error) {
        return <div className="ErrorMessage">{error}</div>;
    }

    return (
        <div className="RegisteredCompanies-content"><br/>
            <h1>Registered Companies</h1>
            {companies.length === 0 ? (
                <p>No approved companies found.</p>
            ) : (
                <table className="companies-table">
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Email</th>
                            <th>Package Type</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map(company => (
                            <tr key={company.id}>
                                <td>{company.company}</td>
                                <td>{company.email}</td>
                                <td>{company.package}</td>
                                <td>{formatDateCompany(company.createdAt)}</td>
                                <td>
                                    <button className="reject-btn" onClick={() => handleReject(company.id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const formatDateCompany = (dateString) => {
    if (!dateString) return 'Invalid Date';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).replace(',', '');
};



const CompanyVehicles = () => {
    const [groupedVehicles, setGroupedVehicles] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/vehicles'); // Adjust based on your server setup
                setGroupedVehicles(response.data);
            } catch (error) {
                setError('Error fetching vehicle data');
                console.error('Error fetching vehicle data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    return (<div><br/>            <h1>Company Vehicles Content</h1>

        <div className="Vehicles-Content">
            {loading && <p>Loading vehicles...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <VehiclesTable groupedVehicles={groupedVehicles} />
            )}
        </div></div>
    );
};

// Separate component for the vehicles table
const VehiclesTable = ({ groupedVehicles }) => {
    return (
        <table className="vehicles-table">
            <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Number of Vehicles</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(groupedVehicles).map(([company, data]) => (
                    <tr key={company}>
                        <td>{company}</td>
                        <td>{data.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


const DriverManagement = () => {
    const [groupedDrivers, setGroupedDrivers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/drivers');
                const drivers = response.data;

                // Group drivers by company
                const grouped = drivers.reduce((acc, driver) => {
                    const company = driver.company || 'Unknown Company';
                    if (!acc[company]) {
                        acc[company] = { count: 0, drivers: [] };
                    }
                    acc[company].count++;
                    acc[company].drivers.push(driver);
                    return acc;
                }, {});

                setGroupedDrivers(grouped);
            } catch (error) {
                setError('Error fetching driver data');
                console.error('Error fetching driver data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDrivers();
    }, []);

    return (<div><br/>
                    <h1>Driver Management</h1>

        <div className="driver-management-content">
            {loading && <p className="loading-text">Loading drivers...</p>}
            {error && <p className="error-text">{error}</p>}
            {!loading && !error && (
                <table className="drivers-table">
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Number of Drivers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(groupedDrivers).map(([company, data]) => (
                            <tr key={company}>
                                <td>{company}</td>
                                <td>{data.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
};


const FuelPriceManagement = () => {
    const [shedType, setShedType] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [price, setPrice] = useState('');
    const [prices, setPrices] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editPrice, setEditPrice] = useState('');

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/fuel-prices');
                setPrices(response.data);
            } catch (error) {
                console.error('Error fetching fuel prices:', error);
            }
        };
        fetchPrices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (price.trim() === '') {
            alert('Please enter a price.');
            return;
        }

        const newPriceEntry = {
            shedType,
            fuelType,
            price: parseFloat(price),
        };

        try {
            await axios.post('http://localhost:5000/api/fuel-price', newPriceEntry);
            setPrices([...prices, newPriceEntry]);
            setPrice('');
            alert('Fuel price updated successfully!');
        } catch (error) {
            console.error('Error saving fuel price:', error);
            alert('Failed to update price');
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditPrice(prices[index].price);
    };

    const handleUpdate = async (index) => {
        if (editPrice.trim() === '') {
            alert('Please enter a valid price.');
            return;
        }

        const updatedPriceEntry = { ...prices[index], price: parseFloat(editPrice) };

        try {
            await axios.put(`http://localhost:5000/api/fuel-price/${prices[index].id}`, updatedPriceEntry);
            const updatedPrices = [...prices];
            updatedPrices[index] = updatedPriceEntry;
            setPrices(updatedPrices);
            setEditIndex(null);
            setEditPrice('');
            alert('Fuel price updated successfully!');
        } catch (error) {
            console.error('Error updating fuel price:', error);
            alert('Failed to update price');
        }
    };

    return (
        <div className="fuel-price-container">
            <h2 className="title">Fuel Price Management</h2>
            <form className="fuel-price-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="shedType">Shed Type</label>
                    <select id="shedType" value={shedType} onChange={(e) => setShedType(e.target.value)}>
                        <option value="">Select Shed Type</option>
                        <option value="Ceypetco">Ceypetco</option>
                        <option value="IOC">IOC</option>
                        <option value="EPC">EPC Contractors</option>
                        <option value="Petrochemical">Petrochemical</option>
                        <option value="Sinopec">Sinopec</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fuelType">Fuel Type</label>
                    <select id="fuelType" value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
                        <option value="">Select Fuel Type</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price (LKR)</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price per liter"
                    />
                </div>
                <button type="submit" className="btn">Update Price</button>
            </form>

            <h3 className="subtitle">Current Prices</h3>
            {prices.length > 0 ? (
                <table className="price-table">
                    <thead>
                        <tr>
                            <th>Shed Type</th>
                            <th>Fuel Type</th>
                            <th>Price (LKR)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prices.map((entry, index) => (
                            <tr key={entry.id}>
                                <td>{entry.shedType}</td>
                                <td>{entry.fuelType}</td>
                                <td>
                                    {editIndex === index ? (
                                        <input
                                            type="number"
                                            value={editPrice}
                                            onChange={(e) => setEditPrice(e.target.value)}
                                            placeholder="Update price"
                                        />
                                    ) : (
                                        entry.price
                                    )}
                                </td>
                                <td>
                                    {editIndex === index ? (
                                        <button onClick={() => handleUpdate(index)} className="btn">Save</button>
                                    ) : (
                                        <button onClick={() => handleEdit(index)} className="btn">Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-data">No fuel prices available</p>
            )}
        </div>
    );
};



  
  




const ContactUsFormManagement = () => {
    const [formSubmissions, setFormSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchSubmissions = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/contact');
          console.log('Fetched submissions:', response.data);
          setFormSubmissions(response.data);
        } catch (error) {
          console.error('Error fetching submissions:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchSubmissions();
    }, []);
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/contact/${id}`);
        setFormSubmissions((prevSubmissions) =>
          prevSubmissions.filter((submission) => submission.id !== id)
        );
        console.log(`Submission with ID ${id} deleted successfully.`);
      } catch (error) {
        console.error('Error deleting submission:', error);
      }
    };
  
    return (
      <div>
        <br />
        <h1>Contact Us Form Management</h1>
        {loading ? (
          <p>Loading submissions...</p>
        ) : formSubmissions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {formSubmissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.name}</td>
                  <td>{submission.email}</td>
                  <td>{submission.mobile}</td>
                  <td>{submission.message}</td>
                  <td>
                    <button
                        className="review-button"
                        onClick={() => handleDelete(submission.id)}
                    >
                        Review
                    </button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No submissions found.</p>
        )}
      </div>
    );
  };
  

  const PackageManagement = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editedPackage, setEditedPackage] = useState(null);  
    const [updatedValues, setUpdatedValues] = useState({
        driverCount: '',
        vehicleCount: '',
        price: '' // New field for price
      });
      

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('http://localhost:5000/api/packages');
          if (!response.ok) throw new Error('Failed to fetch packages');
          const data = await response.json();
          setPackages(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setUpdatedValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (pkg) => {
        setEditedPackage(pkg);
        setUpdatedValues({
            driverCount: pkg.driverCount,
            vehicleCount: pkg.vehicleCount,
            price: pkg.price // Initialize price
        });
    };
    

    const handleUpdate = async (pkg) => {
        const updatedPkg = {
            ...pkg,
            driverCount: updatedValues.driverCount,
            vehicleCount: updatedValues.vehicleCount,
            price: updatedValues.price // Include updated price
        };
    
        try {
            const response = await fetch(`http://localhost:5000/api/packages/${pkg.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPkg)
            });
    
            if (!response.ok) throw new Error('Failed to update package');
            fetchPackages();  
            setEditedPackage(null);  
        } catch (err) {
            setError(err.message);
        }
    };
    

    return (
        <div>
            <br/><br/>
        <div className="container"><br/>
            <h2 className="title">Package Management</h2>
            
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error-alert">{error}</div>}

            <div className="table-container">
                <table className="package-table">
                    <thead>
                        <tr>
                            <th>Package Type</th>
                            <th>Driver Count</th>
                            <th>Vehicle Count</th>
                            <th>Package Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((pkg) => (
                            <tr key={pkg.id}>
                                <td>{pkg.packageType}</td>
                                <td>
                                    {editedPackage && editedPackage.packageType === pkg.packageType ? (
                                        <input
                                            type="number"
                                            name="driverCount"
                                            value={updatedValues.driverCount}
                                            onChange={handleEditChange}
                                            className="input-field"
                                        />
                                    ) : (
                                        pkg.driverCount
                                    )}
                                </td>
                                <td>
                                    {editedPackage && editedPackage.packageType === pkg.packageType ? (
                                        <input
                                            type="number"
                                            name="vehicleCount"
                                            value={updatedValues.vehicleCount}
                                            onChange={handleEditChange}
                                            className="input-field"
                                        />
                                    ) : (
                                        pkg.vehicleCount
                                    )}
                                </td>
                                <td>
                                        {editedPackage && editedPackage.packageType === pkg.packageType ? (
                                            <input
                                                type="number"
                                                name="price"
                                                value={updatedValues.price}
                                                onChange={handleEditChange}
                                                className="input-field"
                                            />
                                        ) : (
                                            pkg.price
                                        )}
                                    </td>

                                <td>
                                    {editedPackage && editedPackage.packageType === pkg.packageType ? (
                                        <button onClick={() => handleUpdate(pkg)} className="btn save-btn">Save</button>
                                    ) : (
                                        <button onClick={() => handleEditClick(pkg)} className="btn edit-btn">Edit</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CSS Styles */}
            <style jsx>{`
                .container {
                    padding: 30px;
                    max-width: 1200px;
                    margin: 0 auto;
                    background-color: #f8fafc;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .error-alert {
                    background-color: #fee2e2;
                    border: 1px solid #ef4444;
                    color: #dc2626;
                    padding: 15px;
                    border-radius: 6px;
                    margin-bottom: 20px;
                }
                .loading {
                    font-size: 20px;
                    color: #555;
                    margin-bottom: 20px;
                }
                .table-container {
                    margin-top: 20px;
                    overflow-x: auto;
                }
                .package-table {
                    width: 100%;
                    border-collapse: collapse;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                th, td {
                    padding: 15px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #f0f4f8;
                    font-weight: 600;
                    color: #333;
                }
                td {
                    background-color: #ffffff;
                    color: #666;
                }
                input.input-field {
                    width: 80px;
                    padding: 8px;
                    font-size: 14px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    background-color: #f9fafb;
                }
                button {
                    padding: 8px 16px;
                    font-size: 14px;
                    border-radius: 6px;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .btn {
                    font-weight: 600;
                    text-transform: uppercase;
                }
                .edit-btn {
                    background-color: #05276f;
                    color: white;
                }
                .edit-btn:hover {
                    background-color: #05270f;
                }
                .save-btn {
                    background-color: #007BFF;
                    color: white;
                }
                .save-btn:hover {
                    background-color: #0056b3;
                }
            `}</style>
        </div>
        </div>
    );
};

  



  const ShedMap = () => {
    const [shedData, setShedData] = useState([]);
    const [location, setLocation] = useState(null);
    const [hoveredShed, setHoveredShed] = useState(null); // To track the hovered shed
  
    useEffect(() => {
      // Fetch all shed locations from the backend API
      const fetchSheds = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/sheds');
          setShedData(response.data);
        } catch (error) {
          console.error('Error fetching shed data:', error);
        }
      };
  
      fetchSheds();
  
      // Get user's current location (optional)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }
    }, []);
  
    if (!shedData.length) return <div>Loading...</div>;
  
    // Icon for regular marker
    const defaultIcon = new Icon({
      iconUrl: 'https://www.freeiconspng.com/thumbs/location-icon-png/location-map-pins-png-3.png',
      iconSize: [25, 25],
    });
  
    // Icon for hovered marker (change this icon as desired)
    const hoverIcon = new Icon({
      iconUrl: 'https://img.icons8.com/ios/50/000000/marker.png', // You can use a different icon here
      iconSize: [30, 30], // Change size or icon for hover
    });
  
    // Icon for approved shed (green)
    const approvedIcon = new Icon({
      iconUrl: 'https://www.freeiconspng.com/uploads/green-location-icons-17.png', // Green marker for approved
      iconSize: [25, 25],
    });
  
    // Icon for unapproved shed (red)
    const unapprovedIcon = new Icon({
      iconUrl: 'https://www.freeiconspng.com/uploads/red-location-icon-map-png-4.png', // Red marker for unapproved
      iconSize: [25, 25],
    });
  
    return (
      <div><br/>
        <MapContainer
  center={[7.8731, 80.7718]} // Coordinates for the center of Sri Lanka
  zoom={7} // Zoom level to fit the whole country
  style={{ height: '500px', width: '100%' }}
>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

  {/* User's current location */}
  {location && (
    <Marker position={[location.lat, location.lng]} icon={defaultIcon}>
      <Popup>Your Location</Popup>
    </Marker>
  )}

  {/* All shed locations */}
  {shedData.map((shed, index) => (
    <Marker
      key={index}
      position={[shed.coordinates.lat, shed.coordinates.lng]} // Use actual coordinates here
      icon={hoveredShed === index ? hoverIcon : (shed.approvedStatus ? approvedIcon : unapprovedIcon)} // Change icon based on approval status
      eventHandlers={{
        onMouseOver: () => setHoveredShed(index), // Set hovered shed on hover
        onMouseOut: () => setHoveredShed(null), // Reset on mouse out
      }}
    >
      <Popup>
        {shed.shedName}
        <br />
        {shed.location}
        <br />
        <strong>Status: </strong>{shed.approvedStatus ? 'Approved' : 'Not Approved'}
      </Popup>
      <Tooltip>
        {shed.shedName} - {shed.shedRegisterNumber} {/* Show shed name and shed register number in tooltip */}
      </Tooltip>
    </Marker>
  ))}
</MapContainer>

      </div>
    );
  };




const Dashboard = () => {
    const [currentView, setCurrentView] = useState('dashboard');
    const [stats, setStats] = useState({
        pendingShedRequests: 0,
        totalRegisteredCompanies: 0,
        totalPendingCompanies: 0,
        totalRegisteredSheds: 0,
        totalCompanyVehicles: 0,
        totalDrivers: 0,
        totalPumpAssistants: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchData();
    }, []);

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
            case 'fuelPriceManage': // Add this case
                return <FuelPriceManagement />;
            case 'contactUsFormManage': // New case
                return <ContactUsFormManagement />;
            case 'shedMap': // New case
                return <ShedMap />;
            case 'managePackage': // New case
                return <PackageManagement />;
            default:
                return (
                    <section className="webadmin-stats">
                        <div className="webadmin-stat-card">
                            <i className="fas fa-warehouse"></i> {/* Icon for pending shed requests */}
                            <h2>Pending  Filling Station Requests</h2>
                            <p>{stats.pendingShedRequests} pending</p>
                        </div>
                        <div className="webadmin-stat-card">
                            <i className="fas fa-building"></i> {/* Icon for total pending companies */}
                            <h2>Total Pending Companies</h2>
                            <p>{stats.totalPendingCompanies} pending</p>
                        </div>
                        <div className="webadmin-stat-card">
                            <i className="fas fa-industry"></i> {/* Icon for total registered companies */}
                            <h2>Total Registered Companies</h2>
                            <p>{stats.totalRegisteredCompanies} companies</p>
                        </div>
                        <div className="webadmin-stat-card">
                            <i className="fas fa-store-alt"></i> {/* Icon for total registered sheds */}
                            <h2>Total Registered  Filling Station</h2>
                            <p>{stats.totalRegisteredSheds} sheds</p>
                        </div>
                        <div className="webadmin-stat-card">
                            <i className="fas fa-car"></i> {/* Icon for total company vehicles */}
                            <h2>Total Company Vehicles</h2>
                            <p>{stats.totalCompanyVehicles} vehicles</p>
                        </div>
                        <div className="webadmin-stat-card">
                            <i className="fas fa-user-tie"></i> {/* Icon for total drivers */}
                            <h2>Total Drivers</h2>
                            <p>{stats.totalDrivers} drivers</p>
                        </div>
                        <div className="webadmin-stat-card">
                            <i className="fas fa-user-nurse"></i> {/* Icon for total pump assistants */}
                            <h2>Total Pump Assistants</h2>
                            <p>{stats.totalPumpAssistants} assistants</p>
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
