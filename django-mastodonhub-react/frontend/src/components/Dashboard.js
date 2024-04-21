import React, { useEffect, useState } from 'react';
import headerImage from '../images/header img.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios';
import FeaturedEvents from './FeaturedEvents';
import ClubsPage from './ClubsPage';
const Dashboard = () => {
  return (
    <div>
      <div id="header-image-container">
      <img src={headerImage} alt="Header" />
        <div className="header-image-text">
          <h1>Welcome to MastodonHub</h1>
          <p>Discover amazing events and clubs on your campus!</p>
        </div>
      </div>
      <main>
        <div className="clubs-container">
          <ClubsPage/>
          <FeaturedEvents/>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
