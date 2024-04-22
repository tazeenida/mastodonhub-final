import { useEffect } from "react";
import axios from "axios";

const Logout = () => {
    useEffect(() => {
        const logout = async () => {
            try {
                await axios.post(
                    'http://localhost:8000/logout/',
                    {},
                    { headers: { "Content-Type": "application/json" } }
                );
                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = "/login";
                }, 3000);
            } catch (error) {
                console.error("Logout failed:", error);
                alert("Logout failed. Please try again.");
            }
        };

        logout();
    }, []);

    return <div>Logging out...</div>;
};

export default Logout;
