import React from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Mainpage_2.css';  // Import the CSS file

const AppDevelopmentSection = () => {
  return (
    <section className="app-development-section">
      {/* Header Section */}
      <div className="header-section">
        <h4 className="header-subtitle">WE ARE RAVON</h4>
        <h2 className="header-title">Award Winning App Development Company</h2>
        <p className="header-description">
          #1 Mobile App Company, Awarded for Its Top Features/Editor Apps Delivered.
        </p>
        <p className="header-content">
          ReeVan started in the year 1999. We are Worldwide-based Web, App, and Digital Marketing Company. Our main Domain is Web Design,
          App Development, Digital Marketing, Product Design, and Cloud Services. Customer Satisfaction and the highest rate of Customer Repeatability
          are some of the pioneers in this field. So, what are you waiting for? Let us discuss your ideas and innovation in detail because catering to your
          requirement and converting it into a final product is our main goal.
        </p>
      </div>



      {/* Awards Section */}
      <div className="awards-section">
        <div className="awards-grid">
          {["Top App Developer", "Top App Developer", "Top App Developer", "Top App Developer", "Top App Developer"].map((title, idx) => (
            <div key={idx} className={`award-item ${idx === 4 ? 'award-item-large' : ''}`}>
              <div className="award-img">
                <img
                  src={`/images/award-image-${idx + 1}.png`}
                  alt={`${title} award`}
                  className="award-img-icon"
                />
              </div>
              <div className="award-title">{title}</div>
              <p className="award-description">Genuine Quality</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppDevelopmentSection;
