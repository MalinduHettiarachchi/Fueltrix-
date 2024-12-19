import React, { useEffect, useState } from "react";
import axios from "axios";
import "./payment.css";
import CARD from "../dashboard/card.png";

const Modal = ({ show, totalPayment, company, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState("Card"); // Default selected method
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cvv: "",
    name: "",
    expiryDate: "",
  });
  const [rememberDetails, setRememberDetails] = useState(false);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("pay-overlay")) {
      onClose();
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

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmitPayment = () => {
    // Payment processing logic here
    if (
      !cardDetails.cardNumber ||
      !cardDetails.cvv ||
      !cardDetails.name ||
      !cardDetails.expiryDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    alert("Payment processed successfully!");
    onClose();
  };

  if (!show) return null;

  return (
    <div className="pay-overlay">
      <div className="pay-content">
        <div className="topictop">
          <p className="company-name">Payment - {company}</p>
          <p className="total-payment">LKR {totalPayment}.00</p>
        </div>

        <div className="payment-methods">
          <button
            className={`method-btn ${
              selectedMethod === "Card" ? "active" : ""
            }`}
            onClick={() => setSelectedMethod("Card")}
          >
            Card
          </button>
          <button
            className={`method-btn ${
              selectedMethod === "Bank" ? "active" : ""
            }`}
            onClick={() => setSelectedMethod("Bank")}
          >
            Bank account
          </button>
        </div>

        {selectedMethod === "Card" && (
          <div className="card-details-ui">
            <p className="card-header">Credit card</p>
            <div className="card-icon">
              <i className="card-image"></i>
            </div>
            <div className="card-image-container">
              <img src={CARD} alt="Card Icon" className="card-image" />
            </div>
            <div className="card-input-grid">
              <div className="input-group">
                <label>Card number *</label>
                <input type="text" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="input-group">
                <label>CVV *</label>
                <input type="text" placeholder="123" />
              </div>
              <div className="input-group">
                <label>Name *</label>
                <input type="text" placeholder="John Smith" />
              </div>
              <div className="input-group">
                <label>Expiration date *</label>
                <input type="text" placeholder="MM/YY" />
              </div>
            </div>
          </div>
        )}

        {selectedMethod === "Bank" && (
          <div className="bank-details-ui">
            <p className="bank-header">Bank account</p>
            <p className="bank-instructions">
              Please transfer the payment to the bank account details shown
              below.
            </p>
            <div className="bank-info">
              <p>
                <strong>Bank:</strong> Commercial Bank of Ceylon 
              </p>
              <p>
                <strong>Account number:</strong> 8006454780
              </p>
              <p>
                <strong>Routing number:</strong> 987654
              </p>
            </div>
          </div>
        )}

        <button className="pay-btn" onClick={handleSubmitPayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Modal;
