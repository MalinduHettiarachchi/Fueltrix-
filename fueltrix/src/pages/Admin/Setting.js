import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Footer from '../../components/Footer';
import './CSS/Settings.css'; // Make sure to create this file for custom styles

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState('UserProfile');

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
          <div>
            <h2>Vehicle Settings</h2>
            <form>
              <label>
                Vehicle Name:
                <input type="text" />
              </label>
              <label>
                Vehicle Type:
                <input type="text" />
              </label>
              <button type="submit">Save</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
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
