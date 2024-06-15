

// =============================

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = ({ user }) => {
//   const handleLogout = () => {
//     fetch('http://localhost:8000/auth/logout', {
//       method: 'GET',
//       credentials: 'include', // Include cookies in the request
//     })
//     .then(response => {
//       if (response.ok) {
//         // Redirect or handle successful logout
//         // document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Delete cookie
//         window.location.href = '/auth'; // Redirect to login page
//       } else {
//         // Handle error
//         console.error('Logout failed:', response.statusText);
//       }
//     })
//     .catch(error => {
//       console.error('Logout error:', error);
//     });
//   };

//   return (
//     <div>
//       <nav className="navbar navbar-expand-md navbar-dark main-color fixed-top">
//         <Link className="navbar-brand" to="#">Todo App</Link>
//         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
//                 aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav">
//             {user && (
//               <li className="nav-item active">
//                 <Link className="nav-link" to="/">Home</Link>
//               </li>
//             )}
//           </ul>
//           <ul className="navbar-nav ml-auto">
//             {user ? (
//               <li className="nav-item m-1">
//                 <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
//               </li>
//             ) : (
//               <li className="nav-item m-1">
//                 <Link className="btn btn-outline-light" to="/auth">Logout</Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        // Token not found, redirect to login page
        window.location.href = '/auth';
        return;
      }

      const response = await fetch('http://localhost:8000/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        // Remove the token from local storage
        localStorage.removeItem('access_token');
        // Redirect to login page
        window.location.href = '/auth';
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark main-color fixed-top">
        <Link className="navbar-brand" to="#">Todo App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          
          <ul className="navbar-nav ml-auto">
           
                <li className="nav-item m-1">
                  <Link className="btn btn-outline-light" to="/auth">Login</Link>
                </li>
                <li className="nav-item m-1">
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </li>

          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         // Token not found, redirect to login page
//         window.location.href = '/auth';
//         return;
//       }

//       const response = await fetch('http://localhost:8000/auth/logout', {
//         method: 'POST',
//         credentials: 'include', // Include cookies in the request
//       });

//       if (response.ok) {
//         // Remove the token from local storage
//         localStorage.removeItem('access_token');
//         // Redirect to login page
//         window.location.href = '/auth';
//       } else {
//         console.error('Logout failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <div>
//       <nav className="navbar navbar-expand-md navbar-dark main-color fixed-top">
//         <Link className="navbar-brand" to="#">Todo App</Link>
//         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
//                 aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ml-auto">
//             {!localStorage.getItem('access_token') ? (
//               <li className="nav-item m-1">
//                 <Link className="btn btn-outline-light" to="/auth">Login</Link>
//               </li>
//             ) : (
//               <li className="nav-item m-1">
//                 <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
//               </li>
//             )}
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

