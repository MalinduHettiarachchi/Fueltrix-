import React from 'react';
import '../dashboard/resett.css';

function Reset() {
  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2>Please reset your password</h2>
        <form>
          <div className="input-group">
            <label>New Password</label>
            <input type="password" placeholder="Your password" />
          </div>
          <div className="input-group">
            <label>Re Enter Password</label>
            <input type="password" placeholder="Your password" />
          </div>
          <button type="submit" className="reset-button">Done</button>
        </form>
      </div>
    </div>
  );
}

export default Reset;
