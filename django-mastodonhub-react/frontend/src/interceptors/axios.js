import axios from "axios";

// Set default Authorization header
const token = localStorage.getItem("access_token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// Set up the Axios instance with base URL
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

let refresh = false;

// Define the response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;

      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        // Attempt to refresh the token
        const refreshResponse = await axios.post(
          "/token/refresh/",
          { refresh: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.access;

          // Store the new token in local storage
          localStorage.setItem("access_token", newAccessToken);

          // Retry the original request with the new token
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          refresh = false; // Reset the refresh flag
          return axiosInstance(error.config);
        }
      }

      // If refresh fails, clear local storage and redirect to login
      localStorage.clear();
      window.location.href = "/login";
    }

    refresh = false;
    return Promise.reject(error);
  }
);

export default axiosInstance;
