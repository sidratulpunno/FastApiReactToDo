
// ======================


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  useEffect(() => {
    const addScript = (src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      return script; // Return the script element
    };

    const jqueryScript = addScript('https://code.jquery.com/jquery-3.6.0.min.js');
    const popperScript = addScript('https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.6/umd/popper.min.js');
    const bootstrapScript = addScript('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js');

    return () => {
      document.body.removeChild(jqueryScript);
      document.body.removeChild(popperScript);
      document.body.removeChild(bootstrapScript);
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark main-color fixed-top">
        <Link className="navbar-brand" to="/">Todo App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {localStorage.getItem('access_token') && (
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            {localStorage.getItem('access_token') ? (
              <li className="nav-item m-1">
                <button type="button" className="btn btn-outline-light" onClick={() => {
                  localStorage.removeItem('access_token');
                  window.location.href = '/auth/logout';
                }}>Logout</button>
              </li>
            ) : (
              <li className="nav-item m-1">
                <Link className="btn btn-outline-light" to="/auth">Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default Layout;

