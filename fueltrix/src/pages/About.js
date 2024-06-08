// src/pages/About.js
import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>About Us</h1>
        <p>About page content goes here.</p>
      </div>
    </>
  );
};

export default About;
