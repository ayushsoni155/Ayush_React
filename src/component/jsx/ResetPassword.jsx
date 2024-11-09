import React, { useState } from 'react';
import '../css/LogSign.css';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const [notification, setNotification] = useState(null);
    const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Regex for password: at least 8 characters, contains both letters and numbers
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

    const enrolID = localStorage.getItem('enrolID');  // Fetch enrolmentID from localStorage
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Validate password fields
        if (name === 'newPassword') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                newPassword: passwordRegex.test(value)
                    ? ''
                    : 'Password must be at least 8 characters long and contain both letters and numbers'
            }));
        }

        if (name === 'confirmPassword') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: value === formData.newPassword
                    ? ''
                    : 'Passwords do not match'
            }));
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for any errors before submission
        if (errors.newPassword || errors.confirmPassword) {
            setNotification({ message: 'Please fix the errors before submitting.', type: 'error' });
            return;
        }

        // Check if password fields are not empty
        if (!formData.newPassword || !formData.confirmPassword) {
            setNotification({ message: 'Both password fields are required.', type: 'error' });
            return;
        }

        try {
            // Send request to the backend to reset password
            const response = await fetch('https://bytewise-server.vercel.app/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enrolmentID: enrolID,  // Include enrolmentID in the request body
                    newPassword: formData.newPassword,
                    confirmPassword: formData.confirmPassword,
                }),
            });

            const data = await response.json();

            // Handle response
            if (response.ok) {
                setNotification({ message: 'Password reset successful! You can now log in.', type: 'success' });
                navigate('/login'); // Navigate to login page
            } else {
                setNotification({ message: data.message || 'An error occurred. Please try again.', type: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            setNotification({ message: 'An error occurred. Please try again later.', type: 'error' });
        }
    };

    return (
        <div className="overlay">
            <button className="close-button" onClick={() => navigate('/forgot-password')}>X</button>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="logSign-container">
                <div className="logSign-img-container">
                    <img src="resetpassword.png" alt="Reset Password" />
                </div>
                <div className="logSign-form-container">
                    <h2>Reset Password for {enrolID}</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="newPassword">New Password</label>
                        {errors.newPassword && <p className="error-text">{errors.newPassword}</p>}
                        <div className="password-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        <label htmlFor="confirmPassword">Confirm Password</label>
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                        <div className="password-input">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        <button type="submit" className="login-button">Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
