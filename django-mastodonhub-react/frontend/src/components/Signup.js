import { useState } from 'react';
import axios from 'axios';
import { useCSRFToken } from './CSRFTokenContext';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [successPopupVisible, setSuccessPopupVisible] = useState(false);
    const csrfToken = useCSRFToken();

    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessPopupVisible(true);
        setTimeout(() => {
            setSuccessPopupVisible(false);
        }, 3000);
        console.log('Registering user', userData, csrfToken);
        try {
            const response = await axios.post(
                'backend/user/create_user/',
                userData,
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                }
            );
            console.log('Registration successful', response.data);
            // Redirect or show success message
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <main id="styles_main">
            <h1 id="signup_id">Create an Account</h1>
            <form id="signup-form" onSubmit={handleSubmit}>
            <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />

                <button type="submit">Sign Up</button>

                {successPopupVisible && (
                    <div className="popup popup-top" id="success-popup">
                        Account created successfully!
                    </div>
                )}
            </form>

            <p className="login-link">Already have an account? <a href="./Login">Log in</a></p>
        </main>
    );
};

export default SignUp;