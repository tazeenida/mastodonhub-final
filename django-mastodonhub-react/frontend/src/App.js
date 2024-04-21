import './styles.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Events from './components/Events';
import Clubs from './components/ClubsPage';
import Login from './components/Login';
import Signup from './components/Signup';
import { CSRFTokenProvider } from './components/CSRFTokenContext';
import { useCheckLogin } from './hooks/useCheckLogin'; 

function App() {
  const { isLoggedIn, isLoading } = useCheckLogin(); // Determine if user is logged in

  if (isLoading) {
    return <div>Loading...</div>; // Show loading while checking login status
  }
  return (
    <CSRFTokenProvider>
    <div>
      <Router>
        <div>
          <Navigation/>
          <Routes>
          <Route path="/" element={isLoggedIn ? <Dashboard />: <Navigate to="/Login" />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/Clubs" element={<Clubs/>} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
      <Footer/>
    </div>
    </CSRFTokenProvider>
  );
}

export default App;