import React from "react";
import "../Vehiregi/vehiregi.css";

function srequest() {
  return (
    <div className="vehirg">
      <div className="leftvr"></div>
      <div className="rightvr">
      <p className="email-label">Registration Number</p>
        <div className="form-group">
          <input
            type="text"
            placeholder="Vehicle Registration Number"
            className="email-input"
          />
        </div>
        <p className="email-label">Vehicle Type</p>
        <div className="form-group">
          <select className="email-input">
            <option value="">Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="truck">Truck</option>
            <option value="bus">Bus</option>
            <option value="van">Van</option>
          </select>
        </div>
        <p className="email-label">Fuel Type</p>
        <div className="form-group">
          <select className="email-input">
            <option value="">Select Fuel Type</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
          </select>
        </div>
        <p className="email-label">Fuel Volume Per Month</p>
        <div className="form-group">
          <input
            type="text"
            placeholder="Fuel Volume"
            className="email-input"
          />
        </div>
        <button className="sign-in">
          <a href="/regivehi">Register</a>
        </button>
      </div>
    </div>
  );
}

export default srequest;
