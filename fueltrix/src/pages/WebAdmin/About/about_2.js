import React from "react";
import "./about_2.css";

function About_2() {
  return (
    <div>
      <div className="yellow-container">
        <div className="yellow-left">
          <h2 className="yelloh2">About Fueltrix</h2>
          <p className="yellowp">
            Fueltrix is an advanced fuel management system that helps businesses track fuel consumption, manage inventory, and monitor deliveries in real-time. Our web and mobile solutions streamline operations, enhance security, and provide accurate tracking and analytics to help businesses make informed decisions and reduce costs.
          </p>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <video controls style={{ maxWidth: "100%", height: "auto", width: "500px", border: "none" }}>
            <source src="/images/Fuel Monitoring System .mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default About_2;
