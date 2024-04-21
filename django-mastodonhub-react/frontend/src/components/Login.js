import React, { useState } from 'react';
import axios from 'axios';
import { useCSRFToken } from './CSRFTokenContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const csrfToken = useCSRFToken();

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Logging in user', loginData, csrfToken);
            const response = await axios.post(
                'backend/user/login/',
                loginData,
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                });
            console.log('Login successful', response.data);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

  

  return (
    <main id="login-main">
      <h1 id="login-heading">Login</h1>
      <form onSubmit={handleFormSubmit} id="login-form">
        <label htmlFor="username" className="form-label">Username</label>
        <input 
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <label htmlFor="password" className="form-label">Password</label>
        <input 
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" className="submit-btn">Login</button>
      </form>
      <p className="signup-link">Don't have an account?<Link className="signup-link" to="/Signup">Sign up</Link></p>
    </main>
  );

};
export default Login;