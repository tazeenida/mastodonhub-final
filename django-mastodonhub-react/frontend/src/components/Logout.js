import { useEffect } from "react";
import axios from "axios";

export const Logout = () => {
    useEffect(() => {
        (async () => {
            await axios.post(
                'http://localhost:8000/logout/',
                { refresh_token: localStorage.getItem('refresh_token') },
                { headers: { 'Content-Type': 'application/json' } }
            );

            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = null;
            window.location.href = '/login';
        })();
    }, []);

    return <div>Logging out...</div>;
};

export default Logout;