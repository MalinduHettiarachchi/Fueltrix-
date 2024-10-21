import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Correct named import
import "../Vehiregi/vehiregi.css";

function SRequest() {
  const [vehicleRegNo, setVehicleRegNo] = useState("");
  const [qrCode, setQrCode] = useState(null);

  const handleRegisterClick = () => {
    if (vehicleRegNo) {
      // Generate QR code with vehicle registration number
      setQrCode(vehicleRegNo);
    }
  };

  return (
    <div className="vehirg">
      <div className="leftvr">
        {qrCode ? (
          <QRCodeCanvas value={qrCode} size={200} /> // Use QRCodeCanvas correctly
        ) : (
          <p>No QR Code generated yet.</p>
        )}
      </div>
      <div className="rightvr">
        <p className="email-label">Registration Number</p>
        <div className="form-group">
          <input
            type="text"
            placeholder="Vehicle Registration Number"
            className="email-input"
            value={vehicleRegNo}
            onChange={(e) => setVehicleRegNo(e.target.value)}
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
        <button className="sign-in" onClick={handleRegisterClick}>
          Register
        </button>
      </div>
    </div>
  );
}

export default SRequest;
