import React, { useEffect, useState } from "react";
import "../Card/card.css";

function Card() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch packages from the API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data = await response.json();
        setPackages(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ backgroundColor: 'white' }}>
      <p className="grab">Grab Your FUELTRIX</p>
      <h1 className="we">We have different types of packages for you.</h1>
      <div className="card-container">
        {packages.map((pkg) => (
          <div className="card" key={pkg.id}>
            <h2>
              {pkg.packageType === "Basic" && <i className="fas fa-car"></i>}
              {pkg.packageType === "Standard" && <i className="fas fa-car-side"></i>}
              {pkg.packageType === "Premium" && <i className="fas fa-gem"></i>}
              {pkg.packageType}
            </h2>
            <p><i className="fas fa-truck"></i> {pkg.vehicleCount} Vehicles</p>
            <p><i className="fas fa-user"></i> {pkg.driverCount} Drivers</p>
            <p><i className="fas fa-money-bill-wave"></i> {pkg.price} LK</p>
            <p><i className="fas fa-id-card"></i> Smart Business Card</p><br /><br />
            <p>
              <i className="fas fa-qrcode fa-3x"></i>
            </p>
            <div className="card-image"></div>
            <div className="price"></div>
            <p>
              <span className="payment-options">KOKO</span> or <span className="payment-options">mintpay</span>
            </p>
            <button className="buy-now">
              {/* Keep the same structure for Buy Now links */}
              <a href={`/buy${pkg.packageType.toLowerCase().slice(0, 1)}`}>Buy Now</a>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
