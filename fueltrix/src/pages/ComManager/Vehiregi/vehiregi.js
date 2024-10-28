import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "../Vehiregi/vehiregi.css"; // Your CSS file for styling
import { useLocation } from 'react-router-dom';

// Simple hash function to generate a shorter unique identifier
const simpleHash = (input) => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i); // Hash function
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36).slice(-6); // Convert to base36 and take the last 6 characters
};

function SRequest() {
  const [vehicleRegNo, setVehicleRegNo] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [fuelVolume, setFuelVolume] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const qrRef = useRef(); // For downloading the QR code

  const location = useLocation(); // Access location object
  const queryParams = new URLSearchParams(location.search); // Parse query parameters
  const company = queryParams.get('company'); // Get the company name

  const handleRegisterClick = () => {
    if (
      vehicleRegNo &&
      vehicleType &&
      fuelType &&
      fuelVolume &&
      !isNaN(fuelVolume) && // Check if fuelVolume is a number
      fuelVolume > 0 // Ensure fuel volume is greater than zero
    ) {
      // Create a unique string by mixing the parameters
      const uniqueString = `${vehicleRegNo}|${vehicleType}|${fuelType}|${fuelVolume}`;
      
      // Generate a shorter hash
      const hashedCode = simpleHash(uniqueString);
      
      setQrCode(hashedCode); // Set QR code with the hashed code

      // Save vehicle details to Firestore
      saveVehicleDetails(hashedCode);
    } else {
      alert("Please fill in all fields correctly."); // Alert if any field is missing or invalid
    }
  };

  const saveVehicleDetails = async (hashedCode) => {
    const vehicleDetails = {
      registrationNumber: vehicleRegNo,
      vehicleType: vehicleType,
      fuelType: fuelType,
      fuelVolume: fuelVolume,
      vehicleCode: hashedCode,
      company: company,
    };

    try {
      const response = await fetch("http://localhost:5000/api/register-vehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to save vehicle details");
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving vehicle details.");
    }
  };

  const handleDownloadClick = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrCode}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // After download, reset the form
    setQrCode(null);
    setVehicleRegNo("");
    setVehicleType("");
    setFuelType("");
    setFuelVolume("");
  };

  return (
    <div className="vehirg">
      <div className="leftvr">
        <p className="vehifuel">Fueltrix</p>
      </div>
      <div className="rightvr">
        {qrCode ? (
          <div className="qr-container">
            <div ref={qrRef}>
              <QRCodeCanvas value={qrCode} size={200} />
            </div>
            <p className="qr-number">Vehicle Code: {qrCode}</p>
            <button className="download-btn" onClick={handleDownloadClick}>
              Download QR Code
            </button>
          </div>
        ) : (
          <>
            <p>Welcome to the vehicle registration page for {company}!</p>
            <p className="topvehi">Vehicle Registration</p>
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
              <select
                className="email-input"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
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
              <select
                className="email-input"
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
              >
                <option value="">Select Fuel Type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
              </select>
            </div>
            <p className="email-label">Fuel Volume Per Month</p>
            <div className="form-group">
              <input
                type="number" // Change input type to 'number'
                placeholder="Fuel Volume"
                className="email-input"
                value={fuelVolume}
                onChange={(e) => setFuelVolume(e.target.value)}
                min="0" // Optional: Minimum value
                required // Optional: Make the field required
              />
            </div>
            <button className="sign-in" onClick={handleRegisterClick}>
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SRequest;
