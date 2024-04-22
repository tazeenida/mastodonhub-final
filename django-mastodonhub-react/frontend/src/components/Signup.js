import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    const user = { username, email, password }; // Prepare the user data

    try {
      // Attempt to create a new user via the API endpoint
      const response = await axios.post(
        'http://localhost:8000/signUp/', // API endpoint for signup
        user,
        {
          headers: {
            'Content-Type': 'application/json', // Ensure proper content type
          },
          withCredentials: true, // Include credentials for cross-origin requests
        }
      );

      if (response.status === 201) { // Check if the user was created successfully
        alert('User created successfully!');
        window.location.href = '/login'; // Redirect to the login page
      }
    } catch (error) { // Handle errors
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error); // Display specific error message
      } else {
        setErrorMessage('An unexpected error occurred.'); // General error message
      }
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submit}> 
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Signup</h3>
    
          {/* Username input */}
          <div className="form-group mt-3">
            <label>Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
    
          {/* Email input */}
          <div class="form-group mt-3">
            <label>Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
    
          {/* Password input */}
          <div class="form-group mt-3">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
    
          {/* Submit button */}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Sign Up</button> 
          </div>
          
          {/* Display error message if signup fails */}
          {errorMessage && (
            <div className="alert alert-danger mt-3">{errorMessage}</div> // Display error
          )}
        </div>
      </form>
    </div>
  );
}

export default SignUp;
