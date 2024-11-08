import React, { useState } from 'react';
import '../css/LogSign.css';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        enrolmentID: '',
        phone: ''
    });

    const [notification, setNotification] = useState(null);
    const [errors, setErrors] = useState({ enrolmentID: '', phone: '' });
    const navigate = useNavigate();

    const enrolmentRegex = /^0704CS\d{6}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Validate input fields
        if (name === 'enrolmentID') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                enrolmentID: enrolmentRegex.test(value) ? '' : 'Invalid enrollment number'
            }));
        }

        if (name === 'phone') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                phone: phoneRegex.test(value) ? '' : 'Invalid phone number'
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
        if (errors.enrolmentID || errors.phone) {
            setNotification({ message: 'Please fix the errors before submitting.', type: 'error' });
            return;
        }

        // Check if enrolmentID and phone fields are not empty
        if (!formData.enrolmentID || !formData.phone) {
            setNotification({ message: 'Enrolment ID and phone number are required.', type: 'error' });
            return;
        }

        try {
            // Send request to the backend for verification
            const response = await fetch('http://localhost:3000/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    enrolmentID: formData.enrolmentID,
                    phone: formData.phone,
                }),
            });

            const data = await response.json();

            // Handle response
            if (response.ok) {
                localStorage.setItem('enrolID', formData.enrolmentID);
                setNotification({ message: 'Verification successful! You can now reset your password.', type: 'success' });
                navigate('/reset-password'); // Navigate to password reset page
            } else {
                setNotification({ message: data.message, type: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            setNotification({ message: 'An error occurred. Please try again later.', type: 'error' });
        }
    };

    return (
        <div className="overlay">
            <button className="close-button" onClick={() => navigate('/login')}>X</button>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="logSign-container">
                <div className="logSign-img-container">
                    <img src="ForgetPassword.jpg" alt="Forgot Password" />
                </div>
                <div className="logSign-form-container">
                    <h2>Forgot Password</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="enrolmentID">Enrollment Number</label>
                        {errors.enrolmentID && <p className="error-text">{errors.enrolmentID}</p>}
                        <input
                            type="text"
                            id="enrolmentID"
                            name="enrolmentID"
                            value={formData.enrolmentID}
                            onChange={handleChange}
                            placeholder="Enter your enrollment number"
                            required
                        />

                        <label htmlFor="phone">Phone Number</label>
                        {errors.phone && <p className="error-text">{errors.phone}</p>}
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                        />

                        <button type="submit" className="login-button">Verify Details</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
