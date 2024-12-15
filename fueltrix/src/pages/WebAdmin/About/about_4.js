import React from "react";
import "./about_4.css";

function About_4() {
  return (
    <div>
      <div className="What-we-do" id="whatwedo">
        <table className="What-we-do-table">

          <tr>
            <td className="image-container-left">
              <img
                src="https://www.uffizio.com/wp-content/uploads/2024/02/ADAS-8-1.jpg"
                alt="Real-Time Fuel Tracking"
                className="resized-image-left"
              />
            </td>
            <td className="text-section-about">
              <h3>Real-Time Fuel Tracking</h3>
              <p>
                Track fuel usage across fleets and facilities instantly. Our system provides live updates, ensuring transparency and control over fuel consumption patterns.
              </p>
            </td>
          </tr>
          <tr>
            <td className="text-section-about">
            <h3>Streamlined Fuel Inventory Control</h3>
            <p>
                Streamline inventory processes with tools that ensure optimal stock levels. Prevent shortages or overstocking with intelligent inventory forecasting.
              </p>

            </td>
            <td className="image-container-right">
              <img
                src="https://bs-uploads.toptal.io/blackfish-uploads/components/open_graph_image/8957367/og_image/optimized/0823-DashboardDesign-Dan-Social-e319a5a8a7ceb75b9e5010740700d409.png"
                alt="Efficient Inventory Management"
                className="resized-image-right"
              />
            </td>
          </tr>
          <tr>
            <td className="image-container-left">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D12AQG1uj_naLLTYg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1694940656104?e=2147483647&v=beta&t=FmBF3LQZWeMhwJ1ZuGomhbIsYFbUXZsa3nLOdlGl5lw"
                alt="Actionable Analytics"
                className="resized-image-left"
              />
            </td>
            <td className="text-section-about">
              <h3>Actionable Analytics</h3>
              <p>
                Leverage data-driven insights to make informed decisions. Our system generates detailed reports to help identify cost-saving opportunities and improve operations.
              </p>

            </td>
          </tr>
          <tr>
            <td className="text-section-about">
              <h3>Sustainable Fuel Practices</h3>
              <p>
                Drive towards sustainability with tools that monitor and optimize fuel usage. Fueltrix helps businesses reduce their carbon footprint and operate more efficiently.
              </p>
            </td>
            <td className="image-container-right">
              <img
                src="https://v3smarttech.com/wp-content/uploads/2022/10/Improve-your-fuel-efficiency-with-a-GPS-tracking-system.png"
                alt="Sustainable Fuel Practices"
                className="resized-image-right"
              />
            </td>
          </tr>
          
        </table>
      </div>
    </div>
  );
}

export default About_4;
