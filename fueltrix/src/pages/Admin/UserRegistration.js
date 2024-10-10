import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import './CSS/UserRegistration.css'; // Make sure your styles are defined here
import InfoImage from '../../img/istockphoto-1390980481-612x612-removebg-preview.png';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required.";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.password) newErrors.password = "Password is required.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    console.log("Form Submitted:", formData);
  };

  return (
    <div className='hednav'>
      <AdminNavbar />
      <div className="spacer" />
      <motion.div className="registration-container">
        <motion.div className="info-section">
          <img src={InfoImage} alt="Info" className="info-image" />
          <h2>Welcome to Fueltrix</h2>
          <p>
            Fueltrix is a QR-based fuel tracking system designed for both mobile and web platforms.
            It provides a seamless experience for tracking fuel usage and management.
          </p>
        </motion.div>
        <motion.div className="form-section">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Drivers Registration
          </motion.h2>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="registration-form"
          >
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter your Full Name"
              />
              {errors.fullName && <div className="error-message">{errors.fullName}</div>}
            </motion.div>
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label>Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter your contact number"
              />
              {errors.contactNumber && <div className="error-message">{errors.contactNumber}</div>}
            </motion.div>
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter your email"
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </motion.div>
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter your password"
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </motion.div>
            <motion.button
              type="submit"
              className="userRegbtn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Register
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default UserRegistration;
