import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import './CSS/UserRegistration.css'; // Import the CSS file


const UserRegistration = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    contactNumber: '',
    vehicleId: '',
    email: '',
    rfidNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here
    console.log(formData);
  };

  const handleGetNumber = () => {
    // Logic to get and set RFID number
    const rfidNumber = '123456789'; // Example RFID number
    setFormData({ ...formData, rfidNumber });
  };

  return (
    <div className='hednav'>
      <AdminNavbar />
      <div>
        <br /><br />
        <div className="containerr mt-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            User Registration
          </motion.h2>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="registration-form"
          >
            {['employeeId', 'name', 'contactNumber','vehicleId'].map((field, index) => (
              <motion.div
                className="form-group"
                key={field}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </motion.div>
            ))}
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
              />
            </motion.div>
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label>RFID Number</label>
              <div className="input-group">
                <input
                  type="text"
                  name="rfidNumber"
                  value={formData.rfidNumber}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    onClick={handleGetNumber}
                    className="btn btn-secondary"
                  >
                    Get Number
                  </button>
                </div>
              </div>
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
              />
            </motion.div>
            <motion.button
              type="submit"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Register
            </motion.button>
          </motion.form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserRegistration;
