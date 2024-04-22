import axios from "axios";

const BASE_URL = "http://localhost:8000"; // Replace with your backend API base URL
let refresh = false;
function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

axios.interceptors.response.use(resp => resp, async error => {
  if (error.response.status === 401 && !refresh) { // Assuming 'refresh' is defined elsewhere
    try {
      refresh = true; // Set refresh to true to prevent infinite retries
      const response = await axios.post(`${BASE_URL}/token/refresh/`, {
        refresh: getRefreshToken(),
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        return axios(error.config);
      }
    } catch (error) {
      // Handle refresh request error (e.g., log the error, redirect to login)
      console.error('Refresh token failed:', error);
    } finally {
      refresh = false; // Reset refresh only after success or error
    }
  }
  return error;
});