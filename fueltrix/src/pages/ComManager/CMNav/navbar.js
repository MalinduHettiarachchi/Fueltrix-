import React from 'react';
import '../CMNav/navbar.css'; // Import your CSS for styling
import logoImage from '../CMNav/Fueltixlogo.png';  // Path to the logo image
import loginImage from '../CMNav/login.png'; // Path to the login image


const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className='row'>
        <li className='log'><a href="/fueltrix"><img src={logoImage} alt="Logo" className="logo-img" /></a></li>
        <li><a href="/card">Custom Card</a></li>
        <li><a href="/review">Review</a></li>
        <li><a href="/ambassadors">Ambassadors</a></li>
        <li><a href="/about">Name</a></li>
        <li className='login'><a href="/login"><img src={loginImage} alt="Login" className="login-img" /></a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
