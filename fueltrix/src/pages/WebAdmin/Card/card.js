import React from "react";
import "../Card/card.css";

function card() {
  return (
    <div style={{ backgroundColor: 'white' }}>
         <p class="grab">Grab Your FUELTRIX </p>
         <h1 class='we'>We have different types of packages for you.</h1>
      <div class="card-container">
        <div class="card">
          <h2>Basic</h2>
          <p>200 Vehicles </p>
          <p>200 Drivers</p>
          <p>Smart Business Card</p>
          <p>Smart Business Card</p>
          <div class="card-image"></div>
          <div class="price">
          </div>
          <p>
             <span class="payment-options">KOKO</span>{" "}
            or <span class="payment-options">mintpay</span>
          </p>
          <button class="buy-now"><a href="/buyb">Buy Now</a></button>
        </div>
        <div class="card">
          <h2>Standard</h2>
          <p>500 Vehicles</p>
          <p>Unlimit Drivers</p>
          <p>Smart Business Card</p>
          <p>Smart Business Card</p>
          <div class="card-image"></div>
          <div class="price">
          </div>
          <p>
            <span class="payment-options">KOKO</span>{" "}
            or <span class="payment-options">mintpay</span>
          </p>
          <button class="buy-now"><a href="/buys">Buy Now</a></button>
        </div>
        <div class="card">
          <h2>Premium</h2>
          <p>Unlimit Vehicles</p>
          <p>Unlimit Drivers</p>
          <p>Smart Business Card</p>
          <p>Smart Business Card</p>
          <div class="card-image"></div>
          <div class="price"> 
          </div>
          <p>
            <span class="payment-options">KOKO</span> or{" "}
            <span class="payment-options">mintpay</span>
          </p>
          <button  class="buy-now"><a href="/buyp">Buy Now</a></button>
        </div>
      </div>
    </div>
  );
}

export default card;
