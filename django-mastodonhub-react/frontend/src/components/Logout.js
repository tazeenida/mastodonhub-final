import { useEffect } from "react";
import axios from "axios";

export const Logout = () => {
    // Refresh the token to ensure it's valid
    const refreshToken = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/token/refresh/',
                { refresh: localStorage.getItem("refresh_token") },
                { headers: { "Content-Type": "application/json" } }
            );
            const newToken = response.data.access; // Get the new access token
            return newToken; // Return the new token
        } catch (error) {
            console.error("Token refresh failed:", error);
            return null; // Return null if refresh fails
        }
    };

    useEffect(() => {
        (async () => {
            // Refresh the token before logging out
            const newAccessToken = await refreshToken();
            
            if (newAccessToken) {
                // If refresh was successful, set the new access token
                axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
            } else {
                // If refresh failed, clear local storage and redirect to login
                localStorage.clear();
                alert("Session expired. Please log in again.");
                window.location.href = "/login";
                return; // Stop further execution
            }

            // Attempt to logout using the new token
            try {
                await axios.post(
                    'http://localhost:8000/logout/',
                    { refresh_token: localStorage.getItem("refresh_token") },
                    { headers: { "Content-Type": "application/json" } }
                );
                localStorage.clear(); // Clear all stored tokens upon successful logout
                window.location.href = "/login"; // Redirect to login page
            } catch (error) {
                console.error("Logout failed:", error); // Log error if logout fails
                alert("Logout failed. Please try again.");
            }
        })(); // Immediately execute the asynchronous function on component mount
    }, []); // UseEffect runs only once on mount

    return <div>Logging out...</div>; // Display a logout message
};

export default Logout;
