import React from 'react';
import Navbar from '../NavBarr/navbarr';
import Footer from '../Footer/footer';
import './contact_1.css';

function Contact_1() {
  return (
    <div className='bg-colors'>
        <div className="banner">
        <img 
            src="https://wallpapercat.com/w/full/a/4/8/2139786-1920x1080-desktop-full-hd-high-tech-wallpaper.jpg" 
            alt="History Banner" 
            className="banner-image" 
        />
        <h1 className="banner-text">History</h1>
        </div>


      <div className='innovations'>
        <h1>Fueltrix: Revolutionizing Fuel Management</h1>
        <p>
          Fueltrix is an advanced fuel management system that helps businesses track fuel consumption, 
          manage inventory, and monitor deliveries in real-time. Our solutions streamline operations, 
          enhance security, and provide analytics to enable informed decisions and cost savings.
        </p>
        <hr></hr>
        <h1>Fueltrix Milestones: Driving Innovation</h1>

        <h1>2021: Foundation</h1>
        <div className='history-normal'>
          <p>
            Fueltrix was founded with a mission to address inefficiencies in fuel management. Starting as a 
            small startup, our team developed the first iteration of our platform, focusing on inventory 
            tracking and delivery monitoring.
          </p>
        </div>

        <h1>2022: Real-Time Analytics Integration</h1>
        <div className='history-normal'>
          <p>
            In 2018, we introduced real-time analytics, enabling businesses to gain actionable insights 
            into fuel usage patterns. This milestone marked a major step toward data-driven decision-making 
            for our clients.
          </p>
        </div>

        <h1>2023: Mobile Platform Launch</h1>
        <div className='history-normal'>
          <p>
            Recognizing the need for mobility, Fueltrix launched its mobile application, providing 
            on-the-go access to inventory data, delivery tracking, and consumption trends. This feature 
            enhanced convenience and operational agility for users.
          </p>
        </div>

        <h1>2024: Advanced Optimization Tools</h1>
        <div className='history-normal'>
          <p>
            In 2024, Fueltrix introduced advanced optimization tools that enhance fuel management efficiency 
            by identifying usage patterns, detecting anomalies, and offering actionable insights to reduce costs. 
            This innovation underscores our commitment to providing cutting-edge solutions for businesses.
          </p>
        </div>

        <div className='History-bold'>
          *Fueltrix: Trusted by businesses worldwide to innovate fuel management solutions.
        </div>
        <br/>
      </div>
    </div>
  );
}

export default Contact_1;
