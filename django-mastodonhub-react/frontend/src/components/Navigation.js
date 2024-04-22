import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useState, useEffect } from "react";

export function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
       setIsAuth(true); 
     }
   }, [isAuth]);
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
            <Nav>
          {isAuth ? <Nav.Link href="/UserProfile">Profile</Nav.Link> :  

                    <Nav.Link href="/Signup">Signup</Nav.Link>},               
          </Nav>
          <Navbar bg="dark" variant="dark">
          <Nav className="me-auto"> 
          </Nav>
          <Nav>
          {isAuth ? <Nav.Link href="/logout">Logout</Nav.Link> :  
                    <Nav.Link href="/login">Login</Nav.Link>},
                    
          </Nav>
          
      </Navbar>
    </div>
  </nav>)
};

export default Navigation;
