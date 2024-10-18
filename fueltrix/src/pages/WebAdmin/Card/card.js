import React from "react";
import "../Card/card.css";

function card() {
  return (
    <div style={{ backgroundColor: 'white' }}>
         <p class="grab">Grab Your FUELTRIX </p>
         <h1 class='we'>We have different types of packages for you.</h1>
      <div class="card-container">
        <div class="card">
          <h2>Classic White Card</h2>
          <p>Smart Business Card</p>
          <div class="card-image"></div>
          <div class="price">
            <p class="new-price">LKR 3590</p>
            <p class="old-price">LKR 4490 - 20%</p>
          </div>
          <p>
            or 3 X LKR 1,196.66 with <span class="payment-options">KOKO</span>{" "}
            or <span class="payment-options">mintpay</span>
          </p>
          <button class="buy-now">Buy Now</button>
        </div>
        <div class="card">
          <h2>Classic Black Card</h2>
          <p>Smart Business Card</p>
          <div class="card-image"></div>
          <div class="price">
            <p class="new-price">LKR 4990</p>
          </div>
          <p>
            or 3 X LKR 1,683.33 with <span class="payment-options">KOKO</span>{" "}
            or <span class="payment-options">mintpay</span>
          </p>
          <button class="buy-now">Buy Now</button>
        </div>
        <div class="card">
          <h2>Company Card</h2>
          <p>Smart Business Card</p>
          <div class="card-image"></div>
          <div class="price">
            <p class="new-price">LKR 5490</p>
          </div>
          <p>
            or 3 X LKR 1,830 with <span class="payment-options">KOKO</span> or{" "}
            <span class="payment-options">mintpay</span>
          </p>
          <button class="buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default card;
