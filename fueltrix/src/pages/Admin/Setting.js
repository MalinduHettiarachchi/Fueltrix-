import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Footer from '../../components/Footer';
import './CSS/Settings.css'; // Make sure to create this file for custom styles

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState('VehicleSettings');

  const renderContent = () => {
    switch (selectedSection) {
      case 'UserProfile':
        return (
          <div>
            <h2>User Profile Setting</h2>
            <form>
              <label>
                Username:
                <input type="text" />
              </label>
              <label>
                Email:
                <input type="email" />
              </label>
              <label>
                Dark Mode:
                <input type="checkbox" />
              </label>
              <button type="submit">Save</button>
            </form>
          </div>
        );
      case 'AdminAccount':
        return (
          <div>
            <h2>Admin Account Setting</h2>
            <form>
              <label>
                Admin Name:
                <input type="text" />
              </label>
              <label>
                Admin Email:
                <input type="email" />
              </label>
              <button type="submit">Save</button>
            </form>
          </div>
        );
      case 'VehicleSettings':
        return (
          <div className="vehicle-settings-section">
            <br></br><br></br>
            <h2>Vehicle Settings</h2>
            <br></br>
            <form className="modern-form">
              <div className="form-group">
                <label htmlFor="vehicleType">Vehicle Type:</label>
                <select id="vehicleType">
                  <option value="">Select Vehicle Type</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="truck">Truck</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fuelType">Fuel Type:</label>
                <select id="fuelType">
                  <option value="">Select Fuel Type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fuelVolume">Fuel Volume:</label>
                <input type="number" id="fuelVolume" min="0" />
              </div>
              <button type="submit" className="btn-save">Save</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='animation'>
      <AdminNavbar />
      <div className="settings-layout">
        <div className="sidebar">
          <ul>
            <li onClick={() => setSelectedSection('UserProfile')}>User Profile Setting</li>
            <li onClick={() => setSelectedSection('AdminAccount')}>Admin Account Setting</li>
            <li onClick={() => setSelectedSection('VehicleSettings')}>Vehicle Settings</li>
          </ul>
        </div>
        <div className="content">
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
