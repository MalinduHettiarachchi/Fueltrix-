import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ManagerContext } from '../dashboard/ManagerContext'; // Import the context
import '../CMNav/navbar.css';
import logoImage from '../CMNav/Fueltixlogo.png';
import loginImage from '../CMNav/login.png';

const Navbar = () => {
  const { managerDetails } = useContext(ManagerContext); // Access the manager details

  // Function to encode the manager details into a query string
  const getQueryParams = () => {
    if (managerDetails) {
      const params = new URLSearchParams();
      params.append('company', managerDetails.company);
      // Add more fields if needed
      return params.toString();
    }
    return '';
  };

  const queryParams = getQueryParams();

  return (
    <nav className="navbar">
      <ul className="row">
        <li className="log">
          <Link to="/fueltrix">
            <img src={logoImage} alt="Logo" className="logo-img" />
          </Link>
        </li>
        <li><Link to="/card">Custom Card</Link></li>
        <li className="dropdown">
          <span className="dropbtn">Registration</span>
          <div className="dropdown-content">
            <Link to={`/drivers?${queryParams}`}>
              Drivers Registration
            </Link>
            <Link to={`/vehicle?${queryParams}`}>
              Vehicle Registration
            </Link>
          </div>
        </li>
        <li><Link to="/amb">Ambassadors</Link></li>
        <li><Link to="/about">About</Link></li>
        <li className='login'>
          <Link to="/login">
            <img src={loginImage} alt="Login" className="login-img" />
          </Link>
        </li>
        {managerDetails && <li className="manager-email">{managerDetails.company}</li>}
      </ul>
    </nav>
  );
};

export default Navbar;
