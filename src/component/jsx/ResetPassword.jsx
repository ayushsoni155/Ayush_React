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
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

    const getSessionData = (key) => {
        const data = sessionStorage.getItem(key);
        if (!data) return null;

        const { value, expiry } = JSON.parse(data);
        if (Date.now() > expiry) {
            sessionStorage.removeItem(key); // Remove expired session
            return null;
        }
        return value;
    };

    const resetData = getSessionData('resetData');

    if (!resetData || !resetData.verificationStatus || !resetData.enrolID) {
        navigate('/forgot-password'); // Redirect if session is expired or invalid
        return null;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'newPassword') {
            const error = passwordRegex.test(value.trim())
                ? ''
                : 'Password must be at least 8 characters long and contain both letters and numbers';
            setErrors((prevErrors) => ({ ...prevErrors, newPassword: error }));
        }

        if (name === 'confirmPassword') {
            const error = value.trim() === formData.newPassword
                ? ''
                : 'Passwords do not match';
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: error }));
        }

        setFormData({ ...formData, [name]: value.trim() });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (errors.newPassword || errors.confirmPassword) {
            setNotification({ message: 'Please fix the errors before submitting.', type: 'error' });
            setLoading(false);
            return;
        }

        if (!formData.newPassword || !formData.confirmPassword) {
            setErrors({
                newPassword: formData.newPassword ? '' : 'This field is required.',
                confirmPassword: formData.confirmPassword ? '' : 'This field is required.'
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://bytewise-server.vercel.app/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enrolmentID: resetData.enrolID,
                    newPassword: formData.newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setNotification({ message: 'Password reset successful! You can now log in.', type: 'success' });
                navigate('/login');
            } else {
                setNotification({ message: data.message || 'An error occurred. Please try again.', type: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            setNotification({ message: 'An error occurred. Please try again later.', type: 'error' });
        }

        setLoading(false);
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
                    <h2>Reset Password for {resetData.enrolID}</h2><br/>
                    <h3>this page will expeir in 5:00</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="newPassword" className={errors.newPassword ? 'label-error' : ''}>
                            New Password
                        </label>
                        <div className="password-input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className={errors.newPassword ? 'input-error' : ''}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.newPassword && <p className="error-text">{errors.newPassword}</p>}

                        <label htmlFor="confirmPassword" className={errors.confirmPassword ? 'label-error' : ''}>
                            Confirm Password
                        </label>
                        <div className="password-input">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className={errors.confirmPassword ? 'input-error' : ''}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

                        {loading ? (
                            <div className="Loginloading"></div>
                        ) : (
                            <button type="submit" className="login-button">Reset Password</button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
