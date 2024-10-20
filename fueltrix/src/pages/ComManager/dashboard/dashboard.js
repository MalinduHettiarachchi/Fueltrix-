import React, { useState, useEffect } from 'react';
import Navbar from '../CMNav/navbar';
import '../dashboard/dashboard.css';
import Modal from 'react-modal';

function Dashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Automatically open the modal when the component loads
  useEffect(() => {
    setModalIsOpen(true); // Open the modal automatically on component mount
  }, []);

  const closeModal = () => {
    setModalIsOpen(false); // Function to close the modal
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="up">
        <div className="left1">
          {/* Add content for the left part here */}
        </div>
        <div className="right1">
          <div className="left11">
            {/* Add content for the left part here */}
          </div>
          <div className="right11">
            {/* Add content for the right part here */}
          </div>
        </div>
      </div>
      <div className="down">
        <div className="left2">
          {/* Add content for the left part here */}
        </div>
        <div className="right2">
          <div className="left21">
            {/* Add content for the left part here */}
          </div>
          <div className="right21">
            <div className="button-container">
              <button className="request">
                <a href="/request" className="request-link">Request</a>
              </button>
              <button className="vehicle">
                <a href="/vehicle" className="vehicle-link">Vehicle</a>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Auto-loaded Popup"
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
        shouldCloseOnOverlayClick={false} // Prevent closing when clicking outside
      >
        <h2 className='topicpl'>Please reset your password</h2>
        <p className="npw">New Password</p>
        <div className="form-group">
          <input
            type="text"
            placeholder="Your password"
            className="npwi"
          />
        </div>
        <p className="rpw">Re Enter Password</p>
        <div className="form-group">
          <input
            type="password"
            placeholder="Your password"
            className="rpwi"
          />
        </div>
        <button className="done" onClick={closeModal}>Done</button>
      </Modal>
    </div>
  );
}

export default Dashboard;
