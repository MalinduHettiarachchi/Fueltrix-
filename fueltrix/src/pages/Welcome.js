// src/pages/Welcome.js
import React from 'react';
import Navbar from '../components/Navbar';
import '../components/Welcome.css'; // Import the CSS file

const Welcome = () => {
  return (
    <>
      <Navbar />
      <div className="container"> {/* Use className instead of style */}
        <h1 className="header">Welcome to Fueltrix</h1> {/* Use className instead of style */}
        <p className="paragraph">Your trusted partner in fuel management solutions.</p> {/* Use className instead of style */}
      </div>
    </>
  );
};

export default Welcome;
