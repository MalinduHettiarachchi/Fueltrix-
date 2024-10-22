import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "../Vehiregi/vehiregi.css";

function SRequest() {
  const [vehicleRegNo, setVehicleRegNo] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [fuelVolume, setFuelVolume] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const qrRef = useRef(); // For downloading the QR code

  const handleRegisterClick = () => {
    if (vehicleRegNo) {
      // Set QR code with vehicle registration number
      setQrCode(vehicleRegNo);
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
            <p className="qr-number">Vehicle Number: {qrCode}</p>
            <button className="download-btn" onClick={handleDownloadClick}>
              Download QR Code
            </button>
          </div>
        ) : (
          <>
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
                <option value="electric">Electric</option>
              </select>
            </div>
            <p className="email-label">Fuel Volume Per Month</p>
            <div className="form-group">
              <input
                type="text"
                placeholder="Fuel Volume"
                className="email-input"
                value={fuelVolume}
                onChange={(e) => setFuelVolume(e.target.value)}
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
