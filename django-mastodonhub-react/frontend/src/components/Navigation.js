import React from 'react';
import { Link } from 'react-router-dom';
import { useCheckLogin } from '../hooks/useCheckLogin'; 

const Navigation = () => {
  const { isLoggedIn, isLoading } = useCheckLogin();

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading message while checking login status
  }

  return(
  <nav className="main-nav">
    <div className="mastodon-label">
      <p>MastodonHub</p>
    </div>
    <ul>
      <li><Link to="/Dashboard">Dashboard</Link></li>
      <li><Link to="/Events">Events</Link></li>
      <li><Link to="/Clubs">Clubs</Link></li>
    </ul>
    <div className="login-signup">
    {isLoggedIn ? (
          <>
            <Link to="/Profile">Profile</Link> {/* When logged in, link to profile */}
            <Link to="/Logout">Logout</Link> {/* Logout option */}
          </>
        ) : (
          <>
            <Link to="/Login">Login</Link> {/* Otherwise, show Login/Signup */}
            <Link to="/Signup">Signup</Link>
          </>
        )}
    </div>
  </nav>)
};

export default Navigation;
