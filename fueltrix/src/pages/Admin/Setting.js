import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Footer from '../../components/Footer';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    // Save settings logic here
    alert('Settings saved!');
  };

  return (
    <div>
      <br></br>
      <AdminNavbar/>
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-item">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </div>
      <div className="settings-item">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="settings-item">
        <label htmlFor="darkMode">Dark Mode:</label>
        <input
          type="checkbox"
          id="darkMode"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </div>
      <button className="save-button" onClick={handleSave}>Save Settings</button>
    </div>
    <Footer/>
    </div>
  );
};

export default Settings;
