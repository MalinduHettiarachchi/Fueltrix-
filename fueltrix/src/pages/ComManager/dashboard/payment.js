import React, { useEffect, useState } from "react";
import "./payment.css"; // Add styles for your modal here

const Modal = ({ show, totalPayment, company, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState("Visa");

  // Handle outside clicks to close the modal
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("pay-overlay")) {
      onClose(); // Close modal if click is outside the modal box
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
              value="Visa"
              checked={selectedMethod === "Visa"}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            Email
          </label>

          
        </div>
      </div>
    </div>
  );
};

export default Modal;
