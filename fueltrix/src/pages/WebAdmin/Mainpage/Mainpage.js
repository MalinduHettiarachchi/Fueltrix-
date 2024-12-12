import React from "react";
import Navbar from "../NavBarr/navbarr";
import "../Mainpage/mainpage.css";
import Partners from "../Partners/partners";
import Footer from "../Footer/footer";
import img1 from "../Mainpage/cfront.png"; // Adjust the path if needed
import img2 from "../Mainpage/cback.png";
import { motion } from "framer-motion";
import HomePage_1 from "./Mainpage_1";
import HomePage_2 from "./Mainpage_2";
import HomePage_3 from "./Mainpage_3";
import HomePage_4 from "./Mainpage_4";



function Mainpage() {
  return (
    <div>
      <Navbar />
      <HomePage_1 />
      <HomePage_2 />
      <div className="mainpage">
        <motion.div
          className="features-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <i className="fas fa-wifi feature-icon"></i>
            <h3>Fuel Monitoring</h3>
            <p>
              Fueltrix helps businesses monitor fuel consumption in real-time, providing accurate data to optimize fuel usage and improve operational efficiency.
            </p>
          </motion.div>
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <i className="fas fa-mobile-alt feature-icon"></i>
            <h3>Mobile & Web Access</h3>
            <p>
              Access Fueltrix through both mobile and web applications, ensuring that your fuel operations are always at your fingertips.
            </p>
          </motion.div>
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <i className="fas fa-share-alt feature-icon"></i>
            <h3>Real-Time Fuel Tracking</h3>
            <p>
              Track fuel deliveries and inventory in real-time, allowing you to make data-driven decisions to reduce costs and improve resource management.
            </p>
          </motion.div>
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <i className="fas fa-user-edit feature-icon"></i>
            <h3>Advanced Reporting</h3>
            <p>
              Generate detailed reports and analytics to gain insights into fuel consumption patterns, helping you make informed decisions for your business.
            </p>
          </motion.div>
        </motion.div>
        <HomePage_3/>
        <HomePage_4/>
        <Partners />
        <Footer />
      </div>
    </div>
  );
}

export default Mainpage;
