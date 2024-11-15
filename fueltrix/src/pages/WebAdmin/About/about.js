import React from "react";
import '../About/about.css'
import Uni from "../About/uni.jpg";
import Navbar from "../NavBarr/navbarr";

function About() {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <div className="about-text">
          <h2>About FUELTRIX</h2>
          <h1>FUELTRIX is a pioneering NFC-based solution provider</h1>
          <p>
            revolutionizing industries through innovative NFC solutions. With
            our inception on October 23rd, 2021, we have become a prominent
            force in Sri Lanka, reshaping the way professionals and corporates
            connect. With over 5000+ professionals and corporates onboard, we
            have fostered a vibrant ecosystem. Our platform enables individuals
            to connect, share industry insights, and explore new business
            opportunities.
          </p>
          <p>
            Our Flagship Product: LUXN Card - Sri Lanka's First Smart Business
            Card. The LUXN Card, Sri Lanka's groundbreaking smart business card.
            By seamlessly integrating NFC technology into traditional business
            cards, professionals can effortlessly exchange contact information,
            social media profiles, and digital content with a simple tap. The
            LUXN Card empowers users with an elegant networking tool, enhancing
            personal and professional connections.
          </p>
        </div>
        <div className="about-image">
          <img src={Uni} alt="LUXN Office" />
          <p className="image-caption">FUELTRIX (PVT) LTD</p>
        </div>
      </div>
    </div>
  );
}

export default About;
