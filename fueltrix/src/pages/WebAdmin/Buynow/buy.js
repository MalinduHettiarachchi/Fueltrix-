import React from 'react';
import '../Buynow/buy.css';
import Navbarr from '../NavBarr/navbarr';
import Card from '../Card/card'

function Buy() {
  return (
    <div className="buy-page" style={{ backgroundColor: 'white' }}>
      <Navbarr /> 
      <Card />
    </div>
  );
}

export default Buy;
