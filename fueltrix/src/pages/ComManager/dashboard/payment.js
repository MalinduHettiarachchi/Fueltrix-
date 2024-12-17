import React, { useEffect, useState } from "react";
import axios from "axios"; // Use Axios to make HTTP requests
import "./payment.css";

const Modal = ({ show, totalPayment, company, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState("Visa");
  const [email, setEmail] = useState(""); // State for email input

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("pay-overlay")) {
      onClose(); // Close modal if click is outside the modal box
    }
  };

  const sendOtp = async () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      // Make a POST request to your backend server to send the email
      const response = await axios.post("http://localhost:5000/send-email", {
        companyName: company,
        totalPrice: totalPayment,
        userEmail: email,
      });

      alert("OTP sent to your email.");
      console.log(response.data.message);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  useEffect(() => {
    if (show) {
      document.body.addEventListener("click", handleOutsideClick);
    } else {
      document.body.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="pay-overlay">
      <div className="pay-content">
        <div className="topictop">
          <p className="company-name">Payment-{company}</p>
          <p className="total-payment">LKR {totalPayment}.00</p>
        </div>
        <p className="paymethod">Select Method</p>

        {/* Radio Buttons Section */}
        <div className="radio-container">
          <label className="radio-label">
            <input
              type="radio"
              name="paymentMethod"
              value="MasterCard"
              checked={selectedMethod === "MasterCard"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            MasterCard
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="paymentMethod"
              value="Email"
              checked={selectedMethod === "Email"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            Email
          </label>
        </div>

        {/* Conditional rendering for Email method */}
        {selectedMethod === "Email" && (
          <div className="email-fields">
            <div className="field-container">
              <label className="field-label">
                <p>Email</p>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="emailinputs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
              </label>
              <button className="send-otp-btn" onClick={sendOtp}>
                Send OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
