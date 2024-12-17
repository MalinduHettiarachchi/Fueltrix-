import React from "react";
import { FaAndroid, FaApple } from 'react-icons/fa';
import { motion } from "framer-motion";
import './Mainpage_4.css';

const Download = () => {
  return (
    <div className="download-container">
      {/* Left Section */}
      <motion.div
        className="left-section"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h4 className="heading-small">DOWNLOAD OUR APP</h4>
        <h1 className="heading-large">
          Download our application from App Store
        </h1>
        <p className="paragraph-download">
          Fueltrix is an advanced fuel management system that helps businesses track fuel consumption, manage inventory, 
          and monitor deliveries in real-time. Our web and mobile solutions streamline operations, enhance security, and 
          provide accurate tracking and analytics to help businesses make informed decisions and reduce costs.
        </p>

        {/* Contact Section */}
        <motion.div
          className="button-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.button
            className="btn btn-playstore"
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
          >
            Play Store 
            <FaAndroid className="IconDownload" />
          </motion.button>

          <motion.button
            className="btn btn-ios"
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
          >
            iOS Store 
            <FaApple className="IconDownload" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="right-section"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div
          className="image-container-download"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {/* Video with infinite loop */}
          <video
            className="video-element"
            src="/images/Untitled design.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Download;
