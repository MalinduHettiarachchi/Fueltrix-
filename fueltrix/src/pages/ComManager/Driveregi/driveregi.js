import React from "react";
import "../Driveregi/driveregi.css";

function driveregi() {
  return (
    <div className="drivrg">
      <div className="leftdr">
      <p className="fueltrix">Fueltrix</p>
      </div>
      <div className="rightdr">
        <p className="topdrive">Driver Registration</p>
        <p className="email-label">Name</p>
        <div className="form-group">
          <input
            type="text"
            placeholder="Your Full Name"
            className="email-input"
          />
        </div>
        <p className="email-label">Email</p>
        <div className="form-group">
          <input
            type="email"
            placeholder="Your email address"
            className="email-input"
          />
        </div>
        <p className="email-label">Contact</p>
        <div className="form-group">
          <input
            type="text"
            placeholder="Your Contact Number"
            className="email-input"
          />
        </div>
        <p className="password-label">Password</p>
        <div className="form-group">
          <input
            type="password"
            placeholder="Your password"
            className="password-input"
          />
        </div>
        <button className="sign-in">
          <a href="/regidrive">Register</a>
        </button>
      </div>
    </div>
  );
}

export default driveregi;

<p className="topvehi">Vehicle Registration</p>
