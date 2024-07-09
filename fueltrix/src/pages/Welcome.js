import React from 'react';
import Navbar from '../components/Navbar';
import '../components/Welcome.css'; 
import { motion } from "framer-motion";
import img1 from "../img/CardFront.png";
import img2 from "../img/CardBack.png";

const Welcome = () => {
  return (
    <div className="Welcome-page">
      <Navbar />
      <div className="container">
        <motion.div 
        initial={{x:-100,opacity:0}}
        animate={{x:0,opacity:1}}
        transition={{duration:0.5,delay:0.5}}>
        <h1  className="header">Welcome to Fueltrix</h1>
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
          <img src={img1} alt='logo' className="side-image" />
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
          <img src={img2} alt='logo' className="side-image" />
        </motion.div>
      </div>
    </div>
    
  );
};

export default Welcome;
