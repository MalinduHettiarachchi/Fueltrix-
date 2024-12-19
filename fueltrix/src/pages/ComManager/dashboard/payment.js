import React, { useEffect, useState } from "react";
import axios from "axios";
import "./payment.css";
import CARD from "../dashboard/card.png";

const Modal = ({ show, totalPayment, company, email, onClose }) => {
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

  const handleSubmitPayment = async () => {
    // Check if the selected payment method is 'Card' or 'Bank'
    if (selectedMethod === "Card") {
      // Validate if card details are filled
      if (!cardDetails.cardNumber || !cardDetails.cvv || !cardDetails.name || !cardDetails.expiryDate) {
        alert("Please fill in all required fields.");
        return;
      }
  
      // Prepare payment details for card payment
      const paymentDetails = {
        totalPayment,
        company,
        email,
        cardDetails, // Include card details in the payload
        time: new Date().toLocaleString(), // Send the current time
      };
  
      try {
        // Send card payment details to the server
        const response = await axios.post("http://localhost:5000/api/sendPaymentEmail", paymentDetails);
        if (response.status === 200) {
          alert("Payment processed successfully!");
          onClose(); // Close the modal after successful payment
        }
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Failed to process payment.");
      }
  
    } else if (selectedMethod === "Bank") {
      // Check if proof of payment file is uploaded
      const proofFile = document.getElementById("proof-upload").files[0];
      if (!proofFile) {
        alert("Please upload proof of payment.");
        return;
      }
  
      // Create a FormData object to send the proof of payment
      const formData = new FormData();
      formData.append("totalPayment", totalPayment);
      formData.append("company", company);
      formData.append("email", email);
      formData.append("proofFile", proofFile); // Add the uploaded file
      formData.append("time", new Date().toLocaleString());
  
      try {
        // Send bank payment details and proof of payment to the server
        const response = await axios.post("http://localhost:5000/api/sendBankPaymentEmail", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Necessary for sending files
          },
        });
        if (response.status === 200) {
          alert("Payment processed successfully!");
          onClose(); // Close the modal after successful payment
        }
      } catch (error) {
        console.error("Error sending bank payment email:", error);
        alert("Failed to process payment.");
      }
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
                <input type="text" placeholder="0000 0000 0000 0000" name="cardNumber" onChange={handleCardInputChange} />
              </div>
              <div className="input-group">
                <label>CVV *</label>
                <input type="text" placeholder="123" name="cvv" onChange={handleCardInputChange} />
              </div>
              <div className="input-group">
                <label>Name *</label>
                <input type="text" placeholder="John Smith" name="name" onChange={handleCardInputChange} />
              </div>
              <div className="input-group">
                <label>Expiration date *</label>
                <input type="text" placeholder="MM/YY" name="expiryDate" onChange={handleCardInputChange} />
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
