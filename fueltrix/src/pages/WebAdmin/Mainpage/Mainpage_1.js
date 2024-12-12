import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faRocket, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faAppStore } from '@fortawesome/free-brands-svg-icons';
import { motion } from "framer-motion";
import "./Mainpage_1.css";

const HomePage = () => {
  return (
    <div>
      <div className="homepage-container">
        <div className="homepage-content">
          {/* Left Section */}
          <motion.div
            className="homepage-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="homepage-heading">
              Welcome to <span className="highlight">Fueltrix</span>
            </h1>
            <p className="homepage-description">
              <span className="highlight">Fueltrix</span> is a leading fuel tracking and management system in Sri Lanka. We optimize fuel usage and streamline management for a smarter, more efficient future.
            </p>

            {/* Stats Section */}
            <motion.div
              className="homepage-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {/* Card 1 */}
              <motion.div
                className="stat-card stat-card-blue"
                whileHover={{ scale: 1.05 }}
              >
                <div className="stat-icon stat-icon-blue">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <div>
                  <div className="stat-value">10M+</div>
                  <div className="stat-label">User Engagement</div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                className="stat-card stat-card-orange"
                whileHover={{ scale: 1.05 }}
              >
                <div className="stat-icon stat-icon-orange">
                  <FontAwesomeIcon icon={faAppStore} />
                </div>
                <div>
                  <div className="stat-value">150+</div>
                  <div className="stat-label">Features</div>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                className="stat-card stat-card-green"
                whileHover={{ scale: 1.05 }}
              >
                <div className="stat-icon stat-icon-green">
                  <FontAwesomeIcon icon={faRocket} />
                </div>
                <div>
                  <div className="stat-value">450+</div>
                  <div className="stat-label">Systems Deployed</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              className="homepage-contact"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <button className="contact-button-btn">
                Contact Fueltrix
                <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Section */}
          <motion.div
            className="homepage-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="image-container">
              <img
                src="./White Black Minimalist Mockup Cup Coffee Instagram Post.jpg"
                alt="Fueltrix Dashboard"
                className="app-design-image"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
