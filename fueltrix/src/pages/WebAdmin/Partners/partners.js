import React from 'react';
import '../Partners/partners.css';
import p1Logo  from '../Partners/pr1.png'
import p2Logo  from '../Partners/pr2.png'
import p3Logo  from '../Partners/pr3.png'

function Partners() {
  const partners = [
    { name: 'Partner 1', logo: '/images/p4.png' }, 
    { name: 'Partner 2', logo: p2Logo },
    { name: 'Partner 3', logo: p3Logo },
    { name: 'Partner 4', logo: '/images/p4.png' },
    { name: 'Partner 5', logo: '/images/p5.png' },
    { name: 'Partner 6', logo: '/images/p6.png' },
  ];

  return (
    <div className="partners-container">
      <h2>10,000+ professionals and corporates have connected with FUELTRIX.</h2>
      <div className="partners-logos">
        {/* Render the partners list twice to create an infinite scroll effect */}
        {partners.map((partner, index) => (
          <div key={index} className="partner-card">
            <img src={partner.logo} alt={partner.name} className="partner-logo" />
          </div>
        ))}
        {partners.map((partner, index) => (
          <div key={index + partners.length} className="partner-card">
            <img src={partner.logo} alt={partner.name} className="partner-logo" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Partners;