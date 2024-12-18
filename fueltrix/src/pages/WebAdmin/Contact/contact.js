import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../NavBarr/navbarr';
import Footer from '../Footer/footer';
import './contact.css';
import Contact_2 from './contact_2';

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, mobile, subject, message }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error || 'Failed to send message. Please try again later.');
      } else {
        const result = await response.json();
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="bg-colors"
    >
      <Navbar />

      {/* Contact Info Section */}
      <div className="ccontact">
        <motion.div
          className="contact-info"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h2>Contact Us</h2>
          <p><i className="fas fa-envelope"></i> <strong>Email:</strong> fueltrix@gmail.com</p>
          <p><i className="fas fa-phone-alt"></i> <strong>Hotline:</strong> +94 76 941 1008</p>
          <p><i className="fas fa-map-marker-alt"></i> <strong>Address:</strong> FUELTRIX, Galle Road, Matara, LK</p>
          <div className="social-icons">
            {['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'].map((icon, index) => (
              <motion.i
                key={icon}
                className={`fab fa-${icon}`}
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
                style={{ margin: '0 10px', cursor: 'pointer' }}
              ></motion.i>
            ))}
          </div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          className="contactform"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <form onSubmit={handleSubmit}>
            <motion.input
              whileFocus={{ boxShadow: '0px 0px 8px rgba(0, 123, 255, 0.5)' }}
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <motion.input
              whileFocus={{ boxShadow: '0px 0px 8px rgba(0, 123, 255, 0.5)' }}
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.input
              whileFocus={{ boxShadow: '0px 0px 8px rgba(0, 123, 255, 0.5)' }}
              type="text"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <motion.input
              whileFocus={{ boxShadow: '0px 0px 8px rgba(0, 123, 255, 0.5)' }}
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <motion.textarea
              whileFocus={{ boxShadow: '0px 0px 8px rgba(0, 123, 255, 0.5)' }}
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></motion.textarea>
            <motion.button
              type="csubmit"
              disabled={loading}
              whileHover={{ scale: 1.1, }}
              transition={{ duration: 0.3 }}
            >
              {loading ? 'Sending...' : 'SUBMIT'}
            </motion.button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </motion.div>
      </div>

      <Contact_2 />
      <Footer />
    </motion.div>
  );
}

export default Contact;
