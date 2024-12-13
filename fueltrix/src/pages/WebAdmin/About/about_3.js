import React from "react";
import { motion } from "framer-motion";
import "./about_3.css";

function About_3() {
  return (
    <div>
      <div className="who-we-are" id="whoweare">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          WHO WE ARE
        </motion.h2>
        <div className="info-table">
          <motion.div
            className="info-card"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <i className="fas fa-gas-pump icon"></i>
            <h3>Real-time Fuel Tracking</h3>
            <p>Monitor fuel consumption and deliveries instantly with advanced tracking solutions.</p>
          </motion.div>
          <motion.div
            className="info-card"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <i className="fas fa-boxes icon"></i>
            <h3>Efficient Inventory Management</h3>
            <p>Streamline fuel inventory and ensure accurate stock levels with minimal effort.</p>
          </motion.div>
          <motion.div
            className="info-card"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <i className="fas fa-chart-line icon"></i>
            <h3>Actionable Analytics</h3>
            <p>Gain insights through detailed analytics to optimize operations and reduce costs.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About_3;
