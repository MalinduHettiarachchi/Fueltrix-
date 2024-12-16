// Portfolio.js
import React, { useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Mainpage_3.css";

const Portfolio = () => {
  const works = [
    {
      title: "Real-Time Fuel Delivery Tracking",
      category: "Fuel Management, Real-Time Tracking",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-zJNfzluA8c22MJ578abgv0-56ImaSWke-g&s",
    },
    {
      title: "Fuel Inventory Management System",
      category: "Inventory, Web Application, Automation",
      image: "https://www.smartwarehousing.com/hubfs/shutterstock_2232272531.jpg",
    },
    {
      title: "Mobile App for Fuel Station Monitoring",
      category: "Mobile Development, FuelTech, Monitoring",
      image: "https://www.replicon.com/wp-assets/uploads/2021/03/mobile-time-tracking.png",
    },
    {
      title: "Advanced Analytics for Fuel Operations",
      category: "Data Analytics, Business Intelligence, Reports",
      image: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg",
    },
    {
      title: "Fuel Theft Detection and Alerts",
      category: "Security, Alerts",
      image: "https://a.storyblok.com/f/47007/2500x1309/352779d35e/220810_mobileappsecuritygraphics_seoblog_v01_meta.png",
    },
    {
      title: "Blockchain-Based Fuel Transactions",
      category: "Blockchain, Security, Transactions",
      image: "https://www.crunchgrowth.com/wp-content/uploads/2017/04/mobile_apps.jpg",
    },
    {
      title: "Custom Reports for Fuel Usage",
      category: "Custom Solutions, Data Science, Analytics",
      image: "https://www.securityguard.app/assets/images/custom-incident-reports.png",
    },
    {
      title: "Integration with Fuel Station",
      category: " Real-Time Data",
      image: "https://www.connectedfueling.com/wp-content/uploads/jumbotron-startpage-en@2x.png",
    },
  ];

  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Auto-scroll with infinite loop logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;

        // Check if scrolled to the end
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollTo({
            left: 0, // Reset to the start
            behavior: "smooth",
          });
        } else {
          handleScroll(1); // Continue scrolling right
        }
      }
    }, 3000); // Adjust timing as needed

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h3>Quality Work</h3>
        <h2>
          Some of our <span>Finest Work</span>
        </h2>
      </div>
      <div className="portfolio-scroll-wrapper">
        {/* Left Arrow Button */}
        <button className="scroll-button left" onClick={() => handleScroll(-1)}>
          <FaChevronLeft size={16} />
        </button>

        {/* Scroll Container */}
        <div className="portfolio-scroll-container" ref={scrollContainerRef}>
          {works.map((work, index) => (
            <div className="portfolio-card" key={index}>
              <img src={work.image} alt={work.title} className="portfolio-image" />
              <div className="portfolio-details">
                <p>{work.category}</p>
                <h3>{work.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button className="scroll-button right" onClick={() => handleScroll(1)}>
          <FaChevronRight size={16} />
        </button>
      </div>
      <div className="portfolio-footer"></div>
    </div>
  );
};

export default Portfolio;
