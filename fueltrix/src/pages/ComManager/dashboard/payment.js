import React, { useEffect, useState } from "react";
import axios from "axios";
import "./payment.css";
import CARD from "../dashboard/card.png";

const Modal = ({ show, totalPayment, company, email, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState("Card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cvv: "",
    name: "",
    expiryDate: "", // Expiry date in MM/YY format
  });
  const [rememberDetails, setRememberDetails] = useState(false);
  const [errors, setErrors] = useState({
    cardNumber: "",
    cvv: "",
    name: "",
    expiryDate: "",
  });

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
    if (name === "expiryDate") {
      // Ensure the input value follows MM/YY format
      const formattedValue = value.replace(/[^0-9/]/g, "").slice(0, 5); // Allow only digits and a slash
      setCardDetails({ ...cardDetails, expiryDate: formattedValue });
    } else {
      setCardDetails({ ...cardDetails, [name]: value });
    }
  };

  const validateCardDetails = () => {
    let valid = true;
    const newErrors = { cardNumber: "", cvv: "", name: "", expiryDate: "" };

    // Card number validation (only numbers and 16 digits)
    if (!/^\d{16}$/.test(cardDetails.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits and contain only numbers.";
      valid = false;
    }

    // CVV validation (only numbers and 3 digits)
    if (!/^\d{3}$/.test(cardDetails.cvv)) {
      newErrors.cvv = "CVV must be 3 digits and contain only numbers.";
      valid = false;
    }

    // Name validation (only letters and spaces)
    if (!/^[A-Za-z\s]+$/.test(cardDetails.name)) {
      newErrors.name = "Name should only contain letters and spaces.";
      valid = false;
    }

    // Expiry date validation (check if valid date format MM/YY)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = "Expiration date must be in MM/YY format.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmitPayment = async () => {
    // Validate if card details are filled and valid
    if (selectedMethod === "Card" && !validateCardDetails()) {
      return;
    }

    // Prepare payment details for selected method
    const paymentDetails = {
      totalPayment,
      company,
      email,
      cardDetails, // Include card details in the payload
      time: new Date().toLocaleString(), // Send the current time
    };

    try {
      // Send payment details to the server
      const response = await axios.post("http://localhost:5000/api/sendPaymentEmail", paymentDetails);
      if (response.status === 200) {
        alert("Payment processed successfully!");
        onClose(); // Close the modal after successful payment
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to process payment.");
    }
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
            className={`method-btn ${selectedMethod === "Card" ? "active" : ""}`}
            onClick={() => setSelectedMethod("Card")}
          >
            Card
          </button>
          <button
            className={`method-btn ${selectedMethod === "Bank" ? "active" : ""}`}
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
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardInputChange}
                />
                {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
              </div>
              <div className="input-group">
                <label>CVV *</label>
                <input
                  type="text"
                  placeholder="123"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                />
                {errors.cvv && <p className="error">{errors.cvv}</p>}
              </div>
              <div className="input-group">
                <label>Name *</label>
                <input
                  type="text"
                  placeholder="John Smith"
                  name="name"
                  value={cardDetails.name}
                  onChange={handleCardInputChange}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className="input-group">
                <label>Expiration date *</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleCardInputChange}
                  maxLength="5" // Limit to 5 characters for MM/YY format
                />
                {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
              </div>
            </div>
          </div>
        )}

        {selectedMethod === "Bank" && (
          <div className="bank-details-ui">
            <p className="bank-header">Bank account</p>
            <p className="bank-instructions">
              Please transfer the payment to the bank account details shown
              below and upload proof of payment.
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
            <div className="upload-section">
              <label htmlFor="proof-upload" className="upload-label">
                Upload proof of payment (Image or PDF):
              </label>
              <input
                type="file"
                id="proof-upload"
                accept=".jpg,.jpeg,.png,.pdf"
                className="upload-input"
              />
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
