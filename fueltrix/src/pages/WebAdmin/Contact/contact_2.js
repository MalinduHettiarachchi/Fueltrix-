import React, { useState } from 'react';
import './contact_2.css';

function contact_2() {

  return (
    <div className='bg-colors'>
      <div className="business-content">
        <div className="text-section-business">
          <h1 className="business-title">Doing Business <br/>with Fueltrix</h1>
          <p>
            Fueltrix is an advanced fuel management system designed to help businesses track fuel consumption, manage inventory, and monitor deliveries in real-time. Our web and mobile solutions streamline operations, enhance security, and provide accurate tracking and analytics to help businesses make informed decisions and reduce costs.
          </p>
        </div>
        <div className="image-section">
          <img 
            src="./White_Black_Minimalist_Mockup_Cup_Coffee_Instagram_Post-removebg-preview.png" 
            alt="Fueltrix"
            className="business-image" 
          />
        </div>
      </div>

      <div className='Partnership'>
        <h1>Our Partnership</h1>
        <p>
          Fueltrix is committed to seeking out partnerships that provide innovative and effective solutions for fuel management. We believe that successful partnerships can help businesses optimize fuel usage, reduce costs, and increase operational efficiency. Explore these resources designed to help you do business with Fueltrix and take your operations to the next level.
        </p>
      </div>

      <div className="yellow-container">
        <div className="yellow-left">
          <h2 className='yelloh2'><strong>Standards of Fueltrix Ethics & <br/>Conduct</strong></h2>
          <p className='yellowp'>
            Fueltrix’s Code of Conduct & Ethics outlines the minimum expectations for all our partners. We are dedicated to maintaining high standards in human rights, inclusion, environmental sustainability, integrity, and ethical business practices.
          </p>

        </div>
        <div className="image-section" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src="https://imageio.forbes.com/specials-images/imageserve/66ff22b9eb0857e70118fa13/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds" 
            alt="Supplier Ethics and Conduct"
            style={{ maxWidth: '80%', height: 'auto', border: 'none' }}
          />
        </div>
      </div>

      <div className="Black-container">
        <div className="image-section" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src="https://media.licdn.com/dms/image/v2/C5612AQGwb6eJNYDP4A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1636200567393?e=2147483647&v=beta&t=Bo6Oup7JMYSUA_-fYAsAfmOYtroeLaycEaO88-fLktk" 
            alt="Diversity and Sustainability"
            style={{ maxWidth: '80%', height: 'auto', border: 'none' }}
          />
        </div>
        <div className="Black-left">
          <h2 className='Blackh2'><strong>Diversity & Sustainability</strong></h2>
          <p className='Blackp'>
            Fueltrix values diversity and sustainability. We are focused on developing relationships with diverse and sustainable third-party suppliers who share our commitment to high standards of service, innovation, and environmental responsibility.
          </p>

        </div>
      </div>

      <div className="yellow-container">
        <div className="yellow-left">
          <h2 className='yelloh2'><strong>Global Terms & <br/>Conditions</strong></h2>
          <p className='yellowp'>
            Fueltrix’s Purchase Order Terms & Conditions govern all orders placed for goods and/or services. Suppliers are expected to agree to these terms to ensure a smooth, efficient, and mutually beneficial relationship.
          </p>

        </div>
        <div className="image-section" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src="https://kronosgroup.eu/wp-content/uploads/2021/01/shutterstock_1043337913.jpg" 
            alt="Purchase Order Terms and Conditions"
            style={{ maxWidth: '80%', height: 'auto', border: 'none' }}
          />
        </div>
      </div>

      <div className="Black-container">
        <div className="image-section" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src="https://i0.wp.com/baskervilledrummond.com/wp-content/uploads/2023/05/systemprocurement_linkedin.jpg?resize=1080%2C675&ssl=1" 
            alt="Procurement and Diligence"
            style={{ maxWidth: '80%', height: 'auto', border: 'none' }}
          />
        </div>
        <div className="Black-left">
          <h2 className='Blackh2'><strong>Our Procurement and Diligence<br/>Process</strong></h2>
          <p className='Blackp'>
            Fueltrix values its business partners and views suppliers as key extensions of our operations. We require thorough financial, operational, risk, and contract diligence to ensure long-term, sustainable relationships.
          </p>
          <p className='Blackp'>Fueltrix is focused on growing partnerships that deliver mutual value and contribute to long-term success.</p>
        </div>
      </div>

    </div>
  );
};

export default contact_2;
