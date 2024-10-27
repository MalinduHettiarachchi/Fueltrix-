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

  const handleRegister = async () => {
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
        <p>Welcome to the Driver registration page for {company}!</p>

        <p className="topdrive">Driver Registration</p>
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
