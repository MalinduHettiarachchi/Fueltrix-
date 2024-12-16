import React from "react";
import "../Card/card.css";

function card() {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <p className="grab">Grab Your FUELTRIX</p>
      <h1 className="we">We have different types of packages for you.</h1>
      <div className="card-container">
      <div className="card">
  <h2><i className="fas fa-car"></i> Basic</h2>
  <p><i className="fas fa-truck"></i> 200 Vehicles</p>
  <p><i className="fas fa-user"></i> 200 Drivers</p>
  <p><i className="fas fa-id-card"></i> Smart Business Card</p><br/><br/>
  <p>
    <i className="fas fa-qrcode fa-3x"></i> 
  </p>
  <div className="card-image"></div>
  <div className="price"></div>
  <p>
    <span className="payment-options">KOKO</span>{" "}
    or <span className="payment-options">mintpay</span>
  </p>
  <button className="buy-now"><a href="/buyb">Buy Now</a></button>
</div>


        <div className="card">
          <h2><i className="fas fa-car-side"></i> Standard</h2>
          <p><i className="fas fa-truck"></i> 500 Vehicles</p>
          <p><i className="fas fa-user-check"></i> Unlimited Drivers</p>
          <p><i className="fas fa-id-card-alt"></i> Smart Business Card</p><br/><br/>
          <p>
    <i className="fas fa-qrcode fa-3x"></i> 
  </p>
          <div className="card-image"></div>
          <div className="price"></div>
          <p>
            <span className="payment-options">KOKO</span>{" "}
            or <span className="payment-options">mintpay</span>
          </p>
          <button className="buy-now"><a href="/buys">Buy Now</a></button>
        </div>
        <div className="card">
          <h2><i className="fas fa-gem"></i> Premium</h2>
          <p><i className="fas fa-truck-loading"></i> Unlimited Vehicles</p>
          <p><i className="fas fa-user-tie"></i> Unlimited Drivers</p>
          <p><i className="fas fa-id-badge"></i> Smart Business Card</p>
          <br/><br/>
          <p>
    <i className="fas fa-qrcode fa-3x"></i> 
  </p>
          <div className="card-image"></div>
          <div className="price"></div>
          <p>
            <span className="payment-options">KOKO</span> or{" "}
            <span className="payment-options">mintpay</span>
          </p>
          <button className="buy-now"><a href="/buyp">Buy Now</a></button>
        </div>
      </div>
    </div>
  );
}

export default card;
