import React from "react";
import "./about_1.css";

function About_1() {
  return (
    <div className="buttom_con">
      {/* Grid Section */}
      <div className="grid-container">
        <div className="grid-item">
          <h2>Advanced Fuel Management</h2>
          <p>
            Fueltrix provides businesses with a comprehensive platform to track
            fuel consumption in real-time. Our system ensures efficiency,
            accuracy, and cost savings.
          </p>
        </div>

        <div className="grid-item">
          <h2>Streamlined Operations</h2>
          <p>
            Manage inventory, monitor deliveries, and reduce operational
            complexities with Fueltrix. Our intuitive solutions cater to your
            business needs seamlessly.
          </p>
        </div>

        <div className="grid-item">
          <h2>Enhanced Security and Analytics</h2>
          <p>
            With robust security measures and detailed analytics, Fueltrix
            empowers businesses to make informed decisions and stay ahead in a
            competitive market.
          </p>
        </div>
      </div>

      {/* Additional Information Section */}
      <table className="responsive-table">
        <tr>
          <td>
            <div className="grid-item grid-item-wide">
              <h2>Real-time Monitoring</h2>
              <p>
                Monitor fuel deliveries and consumption in real-time. Gain
                actionable insights to improve efficiency and reduce waste
                across your operations.
              </p>
            </div>
          </td>
          <td>
            <div className="grid-item grid-item-wide">
              <h2>Fueltrix: Your Trusted Partner</h2>
              <p>
                At Fueltrix, we prioritize your business success. Our
                innovative solutions are tailored to meet the dynamic demands
                of the fuel management industry.
              </p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default About_1;
