import React, { useState } from "react";
import "../Driveregi/driveregi.css";
import { useLocation } from 'react-router-dom';

function Driveregi() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const company = queryParams.get('company');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    // Basic validation
    if (!name) {
      alert("Name is required.");
      return false;
    }
    if (!email) {
      alert("Email is required.");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!contact) {
      alert("Contact number is required.");
      return false;
    }
    if (!/^\d{10}$/.test(contact)) {
      alert("Contact number should be 10 digits.");
      return false;
    }
    if (!password) {
      alert("Password is required.");
      return false;
    }
    if (password.length < 6) {
      alert("Password should be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await fetch('http://localhost:5000/api/driver/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          contact,
          password,
          company,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Show success message
        // Optionally redirect or clear form
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="drivrg">
      <div className="leftdr">
        <p className="fueltrix">Fueltrix</p>
      </div>
      <div className="rightdr">
        <p className="topdrive">Driver Registration - {company}</p>
        <p className="email-label">Name</p>
        <div className="form-group">
          <input
            type="text"
            placeholder="Your Full Name"
            className="email-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <p className="email-label">Email</p>
        <div className="form-group">
          <input
            type="email"
            placeholder="Your email address"
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <p className="email-label">Contact</p>
        <div className="form-group">
          <input
            type="text"
            placeholder="Your Contact Number"
            className="email-input"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <p className="password-label">Password</p>
        <div className="form-group">
          <input
            type="password"
            placeholder="Your password"
            className="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="sign-in" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Driveregi;
