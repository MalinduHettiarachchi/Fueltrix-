import React, { useState } from 'react';
import HamburgerMenu from 'react-hamburger-menu'; // Install this library if not already
import '../NavBarr/navbarr.css'; // Import your CSS for styling
import logoImage from '../NavBarr/Fueltixlogo.png'; // Path to the logo image
import loginImage from '../NavBarr/login.png'; // Path to the login image

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <ul className="row">
          <li className="log">
            <a href="/fueltrix"><img src={logoImage} alt="Logo" className="logo-img" /></a>
          </li>
          <li className="desktop-only"><a href="/buy">Buy Now</a></li>
          <li className="desktop-only"><a href="/ourteam">Our Team</a></li>
          <li className="desktop-only"><a href="/card">Custom Card</a></li>
          <li className="desktop-only"><a href="/about">About</a></li>
          <li className="desktop-only"><a href="/contact">Contact</a></li>
          <li className="login">
            <a href="/login"><img src={loginImage} alt="Login" className="login-img" /></a>
          </li>
          <li className="mobile-only">
            <HamburgerMenu
              isOpen={isOpen}
              menuClicked={toggleMenu}
              width={18}
              height={15}
              strokeWidth={2}
              color="white"
              borderRadius={0}
              animationDuration={0.5}
            />
          </li>
        </ul>
      </nav>
      {isOpen && (
        <div className="mobile-menu">
          <ul>
            <li><a href="/buy">Buy Now</a></li>
            <li><a href="/ourteam">Our Team</a></li>
            <li><a href="/card">Custom Card</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
