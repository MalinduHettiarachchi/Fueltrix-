import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import AdminNavbar from './AdminNavbar';
import './CSS/ShedRegistration.css';
import Footer from '../../components/Footer';
import LocationPicker from './LocationPicker';

const ShedRegistration = () => {
  const [shedData, setShedData] = useState({
    shedId: '',
    shedName: '',
    email: '',
    securityKey: '',
    location: '',
  });

  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShedData({ ...shedData, [name]: value });
  };

  const handlePickLocation = () => {
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
  };

  const handleGenerateKey = () => {
    const { shedId, shedName } = shedData;
    const randomSuffix = Math.floor(Math.random() * 10000);
    const generatedKey = `${shedId}-${shedName}-${randomSuffix}`;
    setShedData((prevData) => ({ ...prevData, securityKey: generatedKey }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(shedData);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='common'>
      <AdminNavbar />

      <div className={`container ${loading ? 'loading' : ''}`}>
        {loading && <div className="loading-spinner"></div>}
        {!loading && (
          <>
            <Modal
              isOpen={showMap}
              onRequestClose={closeMap}
              className="modal-content"
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
              }}
            >
              <LocationPicker setShedData={setShedData} closeMap={closeMap} />
              <button className="close" onClick={closeMap}>&times;</button>
            </Modal>

            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h1>Shed Registration</h1>
                <div className="form-group">
                  <label htmlFor="shedId">Shed ID:</label>
                  <input type="text" id="shedId" name="shedId" value={shedData.shedId} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="shedName">Shed Name:</label>
                  <input type="text" id="shedName" name="shedName" value={shedData.shedName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" value={shedData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="securityKey">Shed Security Key:</label>
                  <div className="key-container">
                    <input type="text" id="securityKey" name="securityKey" className="key-input" value={shedData.securityKey} onChange={handleChange} />
                    <button type="button" className="key-button" onClick={handleGenerateKey}>Generate Key</button>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location:</label>
                  <div className="location-container">
                    <input type="text" id="location" name="location" className="location" value={shedData.location} onChange={handleChange} />
                    <button type="button" className="location-button" onClick={handlePickLocation}>Pick Location</button>
                  </div>
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShedRegistration;
