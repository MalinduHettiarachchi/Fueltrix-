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
          <Link to="/dashboard">
            <img src={logoImage} alt="Logo" className="logo-img" />
          </Link>
        </li>
         
        {managerDetails && <li className="manager-name">{managerDetails.company}</li>}
        <li className='login'>
          <Link to="/login">
            <img src={loginImage} alt="Login" className="login-img" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
