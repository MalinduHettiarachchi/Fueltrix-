import React from "react";
import "../About/about.css";
import Uni from "../About/uni.jpg";
import Navbar from "../NavBarr/navbarr";
import Footer from "../Footer/footer";
import { motion } from "framer-motion";
import About_1 from "./about_1";
import About_2 from "./about_2";
import About_3 from "./about_3";



function About() {
  return (
    <div className="Backgroun_bg">
      <Navbar />

      {/* Leadership Title Section with Motion */}
      <motion.div
        className="leadership-title"
        initial={{ opacity: 0, y: -50 }} // Starting state
        animate={{ opacity: 1, y: 0 }} // End state
        transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
      >
        <h6>ABOUT US</h6>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          Fueltrix: Revolutionizing Fuel Management
        </motion.h1>
      </motion.div>
      <About_3/>
      <About_2/>
      <About_1/>
      <Footer />
    </div>
  );
}

export default About;
