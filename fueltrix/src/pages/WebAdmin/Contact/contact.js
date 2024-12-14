import React, { useState } from 'react';
import Navbar from '../NavBarr/navbarr';
import Footer from '../Footer/footer';
import './contact.css';
import Contact_2 from './contact_2';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !message) {
      setError('Please fill in all required fields.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, mobile, subject, message }),
      });
  
      // Check if response is OK before attempting to parse JSON
      if (!response.ok) {
        const result = await response.json();  // Get JSON error details
        setError(result.error || 'Failed to send message. Please try again later.');
      } else {
        const result = await response.json();  // Get success message
        alert(result.message);
        setName('');
        setEmail('');
        setMobile('');
        setSubject('');
        setMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Error sending message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='bg-colors'>
      <Navbar />
      <div className="ccontact">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p><i className="fas fa-envelope"></i> <strong>Email:</strong> fueltrix@gmail.com</p>
          <p><i className="fas fa-phone-alt"></i> <strong>Hotline:</strong> +94 71 169 1008</p>
          <p><i className="fas fa-map-marker-alt"></i> <strong>Address:</strong> COVENTRY, Hakmana Road, Gabada Veediya, Matara, LK</p>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-tiktok"></i>
          </div>
        </div>
        <div className="contactform">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button type="csubmit" disabled={loading}>
              {loading ? 'Sending...' : 'SUBMIT'}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
      <Contact_2/>
      <Footer />
    </div>
  );
}

export default Contact;
