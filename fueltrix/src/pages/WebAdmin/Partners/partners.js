import React from 'react';
import '../Partners/partners.css';
import p1Logo  from '../Partners/pr1.png'
import p2Logo  from '../Partners/pr2.png'
import p3Logo  from '../Partners/pr3.png'
import p4Logo  from '../Partners/pr4.png'
import p5Logo  from '../Partners/pr5.png'
import p6Logo  from '../Partners/pr6.png'

function Partners() {
  const partners = [
    { name: 'Partner 1', logo: p1Logo }, 
    { name: 'Partner 2', logo: p2Logo },
    { name: 'Partner 3', logo: p3Logo },
    { name: 'Partner 4', logo: p4Logo },
    { name: 'Partner 5', logo: p5Logo },
    { name: 'Partner 6', logo: p6Logo },
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