// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import UserRegistration from './pages/Admin/UserRegistration';
import VehicleRegistration from './pages/Admin/VehicleRegistration';
import ShedRegistration from './pages/Admin/ShedRegistration';
import ViewDetails from './pages/Admin/ViewDetails';
import ViewSummary from './pages/Admin/ViewSummary';
import Settings from './pages/Admin/Setting';
import AdminNavbar from './pages/Admin/AdminNavbar';
import ViewLocation from './pages/Admin/ViewLocation';
import RegistrationReq from './pages/RegistrationReq';
import WebAdminLogin  from './pages/WebAdmin/Login/WebAdminLogin';
import WebAdminDashboard from './pages/WebAdmin/Dashboard/WebAdminDashboard';
import Mainpage from './pages/WebAdmin/Mainpage/Mainpage';
import Login from './pages/WebAdmin/Userlogin/login';
import Dashboard from './pages/ComManager/dashboard/dashboard';
import Buynow from './pages/WebAdmin/Buynow/buy'
import Ourteam from './pages/WebAdmin/Ourteam/ourteam'
import Buypb from './pages/WebAdmin/Card/basicpb'
import Buyps from './pages/WebAdmin/Card/basicps'
import Buypp from './pages/WebAdmin/Card/basicpp'
import Driver from './pages/ComManager/Driveregi/driveregi'
import Vehicle from './pages/ComManager/Vehiregi/vehiregi'
import Resetpw from './pages/WebAdmin/ResetPW/resetpw'
import Thank from './pages/WebAdmin/Card/thank'
import WelcomeFu from './pages/WebAdmin/Userlogin/welcomefu';



/*<Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fueltrix" element={<Mainpage />} />
          <Route path="/buy" element={<Buynow />} />
          <Route path="/signin" element={<Dashboard />} />
          <Route path="/sumbit" element={<Mainpage />} />*/ 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fueltrix" element={<Mainpage />} />
          <Route path="/drivers" element={<Driver />} /> 
          <Route path="/vehicle" element={<Vehicle />} /> 
          <Route path="/review" element={<Thank />} /> 
          <Route path="/buy" element={<Buynow />} />  
          <Route path="/card" element={<Resetpw />} />          
          <Route path="/signin" element={<WelcomeFu />} />        
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ourteam" element={<Ourteam />} />
          <Route path="/buyb" element={<Buypb />} />
          <Route path="/buys" element={<Buyps />} />
          <Route path="/buyp" element={<Buypp />} />
          <Route path="/close" element={<Buynow />} />
          <Route path="/sumbit" element={<Mainpage />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/user-registration" element={<UserRegistration />} />
          <Route path="/vehicle-registration" element={<VehicleRegistration />} />
          <Route path="/shed-registration" element={<ShedRegistration />} />
          <Route path="/view-details" element={<ViewDetails />} />
          <Route path="/view-summary" element={<ViewSummary />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/adminNavbar" element={<AdminNavbar />} />
          <Route path="/viewlocation" element={<ViewLocation />} />
          <Route path="/registrationReq" element={<RegistrationReq />} />
          <Route path="/webAdminLogin" element={<WebAdminLogin />} />
          <Route path="/webAdminDashboard" element={<WebAdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
