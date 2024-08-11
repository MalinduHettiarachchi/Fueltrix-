import React from 'react';
import Navbar from '../components/Navbar';
import '../components/Welcome.css'; 
import { motion } from "framer-motion";
import img1 from "../img/CardFront.png";
import img2 from "../img/CardBack.png";
import videoFile from "../img/count1.mp4"; // Make sure to place your video file in the correct folder

const Welcome = () => {
  return (
    <div className="Welcome-page">
      <Navbar />

      {/* New Section */}
      <div className="navbar-section">
        <motion.div 
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5, delay: 0.5}}
        >
          <p className="navbar-text"></p>
        </motion.div>
      </div>
      
      <div className="container">
        <motion.div 
          initial={{x:-100,opacity:0}}
          animate={{x:0,opacity:1}}
          transition={{duration:0.5,delay:0.5}}>
          <h1 className="header">Welcome to Fueltrix</h1>
        </motion.div>

        <motion.div
          initial={{x:-100,opacity:0}}
          animate={{x:0,opacity:1}}
          transition={{duration:0.5,delay:1}}>
          <p className="paragraph">Fueltrix simplifies fueling with our advanced system. <br />
              Enjoy efficient, cost-effective, and reliable fueling.<br />
              Transform your fuel management with Fueltrix.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.5 ,
            ease: [0, 0.71, 0.2, 1.01]
          }}
          className="image-container1">
          <img src={img1} alt='Card Front' className="side-image" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 1,
            ease: [0, 0.71, 0.2, 1.01]
          }}
          className="image-container2">
          <img src={img2} alt='Card Back' className="side-image" />
        </motion.div>

        {/* Video Section - Now placed below all categories */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 1.5,
            ease: [0, 0.71, 0.2, 1.01]
          }}
          className="video-container">
          <video className="welcome-video" src={videoFile} autoPlay loop muted />
        </motion.div>

      </div>
    </div>
  );
};

export default Welcome;
