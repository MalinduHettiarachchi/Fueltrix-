import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; 
import '../components/Welcome.css'; 

const Welcome = () => {
  return (
    <div className="Welcome-page">
      <Navbar />
      <div className="container">
        <h1 className="header">Welcome to Fueltrix</h1>
        <p className="paragraph">Your trusted partner in fuel management solutions.</p>
      </div>
      <Footer /> 
    </div>
    
  );
};

export default Welcome;
