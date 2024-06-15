import React, { useState } from 'react';
import Layout from './layout';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [msg, setMsg] = useState('');

// Update form submission to send JSON data
const handleRegister = async (e) => {
  e.preventDefault();
  if (password !== password2) {
    setMsg('Passwords do not match');
    return;
  }
  try {

    const requestData = {
      email,
      username,
      first_name,
      last_name,
      password,
    };
    console.log(JSON.stringify(requestData));

    const response = await fetch("http://127.0.0.1:8000/auth/register/", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData), // Include password2 in the payload
    });
    if(response.ok)
      {
        console.log("Ok");
      } else{
        console.log("not ok")
      }
    
    const data = await response.json();
    if (response.ok) {
      
      window.location.href = '/auth'; // Redirect manually
    } else {
      setMsg(data.message || 'Registration failed'); // Update to match backend response structure
    }
  } catch (error) {
    console.error('Registration error:', error);
    setMsg('An error occurred while registering');
  }
};


  return (
    <div class="container">
      <div class="card">
        <div class="card-header">
          Register
        </div>
        <div class="card-body">
          {msg && <div class="alert alert-danger" role="alert">{msg}</div>}
          <form onSubmit={handleRegister} method="POST" action="/auth/register">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  class="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label>Username</label>
                <input
                  type="text"
                  class="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  required
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>First Name</label>
                <input
                  type="text"
                  class="form-control"
                  value={first_name}
                  onChange={(e) => setFirstname(e.target.value)}
                  name="firstname"
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label>Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  value={last_name}
                  onChange={(e) => setLastname(e.target.value)}
                  name="lastname"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required
              />
            </div>
            <div class="form-group">
              <label>Verify Password</label>
              <input
                type="password"
                class="form-control"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                name="password2"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
          </form>
        </div>
        <div class="card-footer text-muted">
          <a href="/auth">Already have an account?</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
