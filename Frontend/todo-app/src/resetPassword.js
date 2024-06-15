

// =================

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ResetNewPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const oobCode = searchParams.get('oobCode');

  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!oobCode) {
      setMessage('Invalid or missing password reset code.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/auth/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oob_code: oobCode, new_password: newPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message); // Set the message from the backend response
      } else {
        setMessage('Error resetting password.');
      }
    } catch (error) {
      setMessage('Error resetting password.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          Reset Password
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password: </label>
              <input 
                type="password" 
                className="form-control" 
                name="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary">Reset Password</button>
          </form>
          {message && <div className={message.includes('success') ? 'text-success' : 'text-danger'}>{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default ResetNewPassword;
