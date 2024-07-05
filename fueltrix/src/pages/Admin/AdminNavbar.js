import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/AdminNavbar.css';

const AdminNavbar = () => {
  const [showRegistrations, setShowRegistrations] = useState(false);
  const [isSettingsRotated, setIsSettingsRotated] = useState(false);

  const handleRegistrationClick = () => {
    setShowRegistrations(!showRegistrations);
  };

  const handleSettingsClick = () => {
    setIsSettingsRotated(!isSettingsRotated);
  };

  return (
    <nav className="adminnavbar">
      <div className="adminnavbar-brand">
        <Link to="/">Fueltrix</Link>
      </div>
      <ul className="adminnavbar-links">
        <li><Link to="/" className="navbar-link">Welcome</Link></li>
        <li className="dropdown">
          <span className="navbar-link" onClick={handleRegistrationClick}>Registration</span>
          {showRegistrations && (
           <ul className="dropdown-menu registration">
           <li><Link to="/user-registration" className="navbar-link">UserRegistration</Link></li>
           <li><Link to="/vehicle-registration" className="navbar-link">VehicleRegistration</Link></li>
           <li className="shed-registration"><Link to="/shed-registration" className="navbar-link">ShedRegistration</Link></li>
         </ul>
         
          )}
        </li>
        <li><Link to="/viewlocation" className="navbar-link">View Details</Link></li>
        <li><Link to="/view-summary" className="navbar-link">View Summary</Link></li>
        <li>
          <Link
            to="/setting"
            className={`navbar-link${isSettingsRotated ? ' settings-rotated' : ''}`}
            onClick={handleSettingsClick}
          >
                <i className="fas fa-cog navbar-icon"></i>


          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
