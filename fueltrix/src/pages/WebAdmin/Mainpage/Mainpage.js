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


function Mainpage() {
  return (
    <div>
            <Navbar />
            <HomePage_1/>
            <HomePage_2/>
    <div className="mainpage">

      <div className="twoclomn">
        <div className="leftmp">
        <motion.div
            initial={{x:-100,opacity:0}}
            animate={{x:0,opacity:1}}
            transition={{duration:0.5,delay:0.5}}
          >
          <p className="fueltrix">Fueltrix</p>
          </motion.div>
        </div>
        <div className="rightmp">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="cfront"
          >
            <img src={img1} alt="logo" className="side-image" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="cback"
          >
            <img src={img2} alt="logo" className="side-image" />
          </motion.div>
        </div>
      </div>
      <div className="features-container">
        <div className="feature-card">
          <i className="fas fa-wifi feature-icon"></i>{" "}
          {/* FontAwesome Wi-Fi Icon */}
          <h3>Share with a Tap</h3>
          <p>
            Tap the LUXN card on your smartphone and instantly share your LUXN
            profile via near-field communication (NFC).
          </p>
        </div>
        <div className="feature-card">
          <i className="fas fa-mobile-alt feature-icon"></i>{" "}
          {/* FontAwesome Mobile Icon */}
          <h3>No App Required</h3>
          <p>
            LUXN profiles are directly viewed through a browser making LUXN
            compatible with all smartphones and tablets.
          </p>
        </div>
        <div className="feature-card">
          <i className="fas fa-share-alt feature-icon"></i>{" "}
          {/* FontAwesome Share Icon */}
          <h3>Unlimited Sharing</h3>
          <p>
            With a one-time purchase of a LUXN card, no monthly fees and enjoy a
            life full of seamless connections.
          </p>
        </div>
        <div className="feature-card">
          <i className="fas fa-user-edit feature-icon"></i>{" "}
          {/* FontAwesome Edit Icon */}
          <h3>Update Your Info</h3>
          <p>
            You can edit your info anytime. Also, you can customize the color of
            your profile, along with dark mode variations.
          </p>
        </div>
      </div>
      <Partners />
      <Footer />
    </div>
    </div>
  );
}

export default Mainpage;
