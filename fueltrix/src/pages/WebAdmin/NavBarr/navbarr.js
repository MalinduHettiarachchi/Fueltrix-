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

  );
};

export default Navbar;
