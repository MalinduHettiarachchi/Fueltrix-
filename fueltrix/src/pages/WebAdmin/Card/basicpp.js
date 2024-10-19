import React, { useState } from "react";
import "../Card/basicpp.css";

export default function Basicpp() {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [messageVisible, setMessageVisible] = useState(false); // To control visibility of the success message
  const packageType = "Premium";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservationData = {
      company: company,
      email: email,
      packageType: packageType,
    };

    try {
      const response = await fetch("http://localhost:5000/submit-reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        // Handle success
        setMessageVisible(true); // Show the success message

        // Clear input fields
        setCompany("");
        setEmail("");

        // Hide the message after 5 seconds
        setTimeout(() => {
          setMessageVisible(false);
        }, 5000);
      } else {
        alert("Failed to submit reservation.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit reservation. Please try again.");
    }
  };

  return (
    <div className="buy-page">
      {/* Navbar at the top */}
      <div className="twcp">
        <div className="leftpb">
          <div className="ambassador-benefits">
            <h2 className="benefit-title">
              What you get as a FUELTRIX Premium?
            </h2>
            <div className="benefit-grid">
              <div className="benefit-item">
                <h3>24/7 Customer Support</h3>
                <p>We're here to help you anytime, day or night.</p>
              </div>
              <div className="benefit-item">
                <h3>Real-Time Tracking</h3>
                <p>Monitor fuel usage in real-time for better efficiency and cost savings.</p>
              </div>
              <div className="benefit-item">
                <h3>FREE Products</h3>
                <p>Receive new FuelTrix features, products, and other freebies.</p>
              </div>
              <div className="benefit-item">
                <h3>Fuel Reports</h3>
                <p>Receive comprehensive reports to track and analyze fuel consumption.</p>
              </div>
              <div className="benefit-item">
                <h3>Vehicle Performance Alerts</h3>
                <p>Get alerts on vehicle performance.</p>
              </div>
              <div className="price">
                <h3>LKR 69990</h3>
                <p className="installment-option">
                  or 3 x LKR 23,330.00 with <span className="koko">KOKO</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rightpb">
          <div className="close-btn">
            <a href="/close">
              <span>&times;</span>
            </a>
          </div>
          <label className="pby">Your Reservation</label>
          <p className="email-label">Company</p>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company Name"
              className="email-input"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <p className="password-label">Email</p>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="password-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="package">Package: Premium</p>
          <button className="sign" onClick={handleSubmit}>
            SUBMIT
          </button>

          {/* Success message */}
          {messageVisible && (
            <button className="successful">
              <a>Reservation Successfully Submitted.</a>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
