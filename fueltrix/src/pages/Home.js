import React from 'react';
import '../styles/Home.css';
import { motion } from "framer-motion";
import img1 from "../img/CardFront.png";
import img2 from "../img/CardBack.png";


const Home = () => {
  return (
    <div className="home">
      <div className="container mx-auto px-8">
      </div>
      <section className="content">
        <div className="company-name">
          <motion.div
            initial={{x:-100,opacity:0}}
            animate={{x:0,opacity:1}}
            transition={{duration:0.5,delay:0.5}}
          >
            <h1 className='h1'>Welcome to Fueltrix</h1>
          </motion.div>
          <motion.div
            initial={{x:-100,opacity:0}}
            animate={{x:0,opacity:1}}
            transition={{duration:0.5,delay:1}}
          >
            <h2 className='h2'>
              Fueltrix simplifies fueling with our advanced system. <br />
              Enjoy efficient, cost-effective, and reliable fueling.<br />
              Transform your fuel management with Fueltrix.
            </h2>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.5,
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
      </section>
    </div>
  );
}

export default Home;
