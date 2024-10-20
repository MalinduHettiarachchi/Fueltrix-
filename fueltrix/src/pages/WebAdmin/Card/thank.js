import React from 'react';
import '../Card/thank.css';

export default function Thank() {  // Updated function name to be capitalized as per React naming convention
  return (
    <div className="thankp">
      <div className="close-btnn">
        <a href="/close"><span>&times;</span></a>
      </div>
      <div className="thank-container">
        <p className="thank">Thank You!</p>
        <p className="link">www.fueltrix.com</p>
      </div>
    </div>
  );
}
