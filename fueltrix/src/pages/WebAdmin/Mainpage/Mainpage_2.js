import React from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Mainpage_2.css';  // Import the CSS file
import { motion } from 'framer-motion';

const AppDevelopmentSection = () => {
  return (
    <div className='app-development-section-bg'>
    <section className="app-development-section">
      {/* Header Section */}
      <div className="header-section">
        <motion.h4
          className="header-subtitle"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          WE ARE FUELTRIX
        </motion.h4>
        <motion.h2
          className="header-title"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Award Winning Fuel Management & Tracking System
        </motion.h2>
        <motion.p
          className="header-description"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          #1 Fuel Management System, Awarded for Its Top Features & Real-Time Fuel Tracking.
        </motion.p>
        <motion.p
          className="header-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Fueltrix is a cutting-edge fuel management and tracking system that helps businesses monitor fuel consumption, manage fuel inventory, and track fuel deliveries in real-time. We offer both web and mobile app solutions designed to streamline fuel operations, ensuring greater efficiency and security. Our platform leverages advanced technology to provide accurate fuel tracking, reporting, and analytics, empowering businesses to make informed decisions and reduce operational costs. Let us help you transform your fuel management experience!
        </motion.p>
      </div>

      {/* Awards Section */}
      <div className="awards-section">
        <motion.div
          className="awards-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {["Innovation in Technology Award", "Customer Satisfaction Excellence", "Industry Recognition Award", "Top Startup in Technology (2023)", "Security and Reliability Excellence"].map((title, idx) => (
            <motion.div
              key={idx}
              className={`award-item ${idx === 4 ? 'award-item-large' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className="award-img">
                <img
                  src={`/images/award-image-${idx + 1}.png`}
                  alt={`${title} award`}
                  className="award-img-icon"
                />
              </div>
              <div className="award-title">{title}</div>
              <p className="award-description">Genuine Quality</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default AppDevelopmentSection;
