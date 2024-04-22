// axiosConfig.js
import axios from 'axios';

// Set up your Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define the interceptor
let refresh = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;

      // Replace with your token refresh logic
      const refreshToken = 'your-refresh-token'; // Retrieve your refresh token
      const response = await axios.post('/refresh-token', { token: refreshToken });

      if (response.status === 200) {
        const newToken = response.data.token;
        
        // Update your token storage
        localStorage.setItem('authToken', newToken);
        
        // Retry the original request with the new token
        error.config.headers['Authorization'] = `Bearer ${newToken}`;
        return axios(error.config);
      }
    }
    
    refresh = false;
    return Promise.reject(error);
  }
);

export default axiosInstance; // Export the configured Axios instance
