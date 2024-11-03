import React, { useState } from 'react';
import '../css/LogSign.css';
import { Link, useNavigate } from 'react-router-dom';
import Notification from './Notification'; 
import { useCookies } from 'react-cookie';

const Signup = () => {
    const [formData, setFormData] = useState({
        enrolmentID: '',
        name: '',
        sem: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [notification, setNotification] = useState(null);
    const [errors, setErrors] = useState({ enrolmentID: '', phone: '', password: '', confirmPassword: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    
    const enrolmentRegex = /^0704CS\d{6,7}$/;
    const phoneRegex = /^[6789]\d{9}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    const [cookies, setCookie] = useCookies(['bytewiseCookies']); // Corrected
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

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

        if (name === 'password') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: passwordRegex.test(value)
                    ? ''
                    : 'Password must be at least 8 characters long and contain both letters and numbers'
            }));

            if (value !== formData.confirmPassword) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword: 'Passwords do not match'
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword: ''
                }));
            }
        }

        if (name === 'confirmPassword') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: value !== formData.password ? 'Passwords do not match' : ''
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (errors.enrolmentID || errors.phone || errors.password || errors.confirmPassword) {
            setNotification({ message: 'Please fix the errors before submitting.', type: 'error' });
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setNotification({ message: 'Signup successful!', type: 'success' });
                setCookie('bytewiseCookies', {
                    enrolmentID: formData.enrolmentID,
                    name: formData.name,
                    sem: formData.sem,
                    phone: formData.phone,
                    status: true // Set status to true on success
                }, { path: '/', maxAge: 3600 });
                setFormData({
                    enrolmentID: '',
                    name: '',
                    sem: '',
                    phone: '',
                    password: '',
                    confirmPassword: ''
                });
                navigate('/');
            } else {
                setNotification({ message: data.message || 'Error signing up', type: 'error' });
                setCookie('bytewiseCookies', {
                    status: false // Set status to false on failure
                }, { path: '/', maxAge: 3600 });
            }
        } catch (error) {
            setNotification({ message: 'Server error! Please try again.', type: 'error' });
            setCookie('bytewiseCookies', {
                status: false // Set status to false on exception
            }, { path: '/', maxAge: 3600 });
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };
        
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
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
                    <img src="Sign.png" alt="SignUp" />
                </div>
                <div className="logSign-form-container">
                    <h2 className='Signinh2'>Create Your Account</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="nameid"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            autoComplete='name'
                            required
                        />
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
                            autoComplete='phone'
                            required
                        />

                        <label htmlFor="sem">Select Semester</label>
                        <select
                            id="sem"
                            name="sem"
                            value={formData.sem}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select your semester</option>
                            {Array.from({ length: 8 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>Semester {index + 1}</option>
                            ))}
                        </select>
                        <label htmlFor="password">Password</label>
                        {errors.password && <p className="error-text">{errors.password}</p>}
                        <div className="password-input">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                required
                            />
                            <button type="button" onClick={togglePasswordVisibility}>
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                        <div className="password-input">
                            <input
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                            />
                            <button type="button" onClick={toggleConfirmPasswordVisibility}>
                                {confirmPasswordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <button type="submit" className="login-button">Signup</button>
                        <span>Already have an account? </span>
                        <Link to="/login">Login</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
