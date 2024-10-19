import React from "react";
import "../Card/basicpp.css";
export default function basicpp() {
  return (
    <div className="buy-page">
      {" "}
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
                <p>Receive comprehensive reports to track and analyze fuel consumption..</p>
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
          <div class="close-btn">
            <a href="/close">
              <span>&times;</span>
            </a>
          </div>
          <label className="pby">Your Reservation</label>
          <p className="email-label">Company</p>
          <div className="form-group">
            <input
              type="email"
              placeholder="Company Name"
              className="email-input"
            />
          </div>
          <p className="password-label">Email</p>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="password-input"
            />
          </div>
          <p className="package">Package : Premium</p>
          <button className="sign">
            <a href="/sumbit">SUBMIT</a>
          </button>
          <button className="successful">
            <a >Reservation Successful Submitted.</a>
          </button>
        </div>
      </div>
    </div>
  );
}
