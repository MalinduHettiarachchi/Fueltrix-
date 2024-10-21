import React from 'react';
import '../ShedRequest/srequest.css';

function SRequest() {
  return (
    <div className="shrc">
      <div className="leftsr">
        <p>Join With Us</p>
      </div>
      <div className="rightsr">
        <p className="shednum">Fuel Station Name</p>
        <div className="shed-group">
          <input type="text" placeholder="Your fuel station name" className="shednum-input" />
        </div>
        <p className="shedname">Register Number</p>
        <div className="shed-group">
          <input type="text" placeholder="Your register number" className="shedname-input" />
        </div>
        <p className="shedem">Email</p>
        <div className="shed-group">
          <input type="email" placeholder="Your email" className="shedem-input" />
        </div>
        <p className="shedloc">Location</p>
        <div className="shed-group">
          <input type="text" placeholder="Pick up your location" className="shedloc-input" />
          <button className="pick-up-btn">Pick UP</button>
        </div>
        <button className="submitshed"><a href="/signin">Submit</a></button>
      </div>
    </div>
  );
}

export default SRequest;
