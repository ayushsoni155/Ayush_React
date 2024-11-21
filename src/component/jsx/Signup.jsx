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
        confirmPassword: '',
        recoveryQuestion: '',
        recoveryAnswer: ''
    });

    const [notification, setNotification] = useState(null);
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const enrolmentRegex = /^0704CS(20|21|22|23|24|25|26)(1[0-2][0-9]{2}|1300)$/;
    const phoneRegex = /^[6789]\d{9}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

    const [cookies, setCookie] = useCookies(['bytewiseCookies']);
    const navigate = useNavigate();

    const recoveryQuestions = [
        "Who is your best friend?",
        "Who is your favorite person?",
        "What is the name of your favorite teacher?",
        "What city were you born in?",
        "What is your favorite dish?"
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedValue = name === 'enrolmentID' ? value.toUpperCase() : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: updatedValue
        }));

        // Validation logic
        const newErrors = { ...errors };

        if (name === 'enrolmentID') {
            newErrors.enrolmentID = enrolmentRegex.test(updatedValue)
                ? ''
                : 'Invalid enrollment number';
        }

        if (name === 'phone') {
            newErrors.phone = phoneRegex.test(value) ? '' : 'Invalid phone number';
        }

        if (name === 'password') {
            newErrors.password = passwordRegex.test(value)
                ? ''
                : 'Password must be at least 8 characters long and contain both letters and numbers';
        }

        if (name === 'confirmPassword') {
            newErrors.confirmPassword =
                value !== formData.password ? 'Passwords do not match' : '';
        }

        if (name === 'recoveryAnswer') {
            newErrors.recoveryAnswer =
                value.trim().length < 3
                    ? 'Recovery answer must be at least 3 characters long'
                    : '';
        }

        setErrors(newErrors);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for any existing errors
        const hasErrors = Object.values(errors).some((error) => error);
        if (hasErrors) {
            setNotification({ message: 'Please fix the errors before submitting.', type: 'error' });
            return;
        }

        try {
            const response = await fetch('https://bytewise-server.vercel.app/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setNotification({ message: 'Signup successful!', type: 'success' });
                setCookie(
                    'bytewiseCookies',
                    {
                        enrolmentID: formData.enrolmentID,
                        name: formData.name,
                        sem: formData.sem,
                        phone: formData.phone,
                        status: true
                    },
                    { path: '/', maxAge: 1296000 }
                );

                setFormData({
                    enrolmentID: '',
                    name: '',
                    sem: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    recoveryQuestion: '',
                    recoveryAnswer: ''
                });

                navigate('/');
            } else {
                setNotification({ message: data.message || 'Error signing up', type: 'error' });
            }
        } catch (error) {
            setNotification({ message: 'Server error! Please try again later.', type: 'error' });
        }
    };

    const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible((prev) => !prev);

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
                    <h2>Create Your Account</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />

                        {/* Enrolment Number */}
                        <label htmlFor="enrolmentID">Enrollment Number</label>
                        {errors.enrolmentID && <p className="error-text">{errors.enrolmentID}</p>}
                        <input
                            type="text"
                            name="enrolmentID"
                            value={formData.enrolmentID}
                            onChange={handleChange}
                            placeholder="Enter your enrollment number"
                            required
                        />

                        {/* Phone Number */}
                        <label htmlFor="phone">Phone Number</label>
                        <p className="info-text">Please provide a valid phone number.</p>
                        {errors.phone && <p className="error-text">{errors.phone}</p>}
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                        />

                        {/* Semester */}
                        <label htmlFor="sem">Semester</label>
                        <select
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

                        {/* Password */}
                        <label htmlFor="password">Password</label>
                        {errors.password && <p className="error-text">{errors.password}</p>}
                        <div className="password-input">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
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

                        {/* Confirm Password */}
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                        <div className="password-input">
                            <input
                                type={confirmPasswordVisible ? 'text' : 'password'}
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

                        {/* Recovery Question */}
                        <label htmlFor="recoveryQuestion">Recovery Question</label>
                        <select
                            name="recoveryQuestion"
                            value={formData.recoveryQuestion}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select a recovery question</option>
                            {recoveryQuestions.map((question, index) => (
                                <option key={index} value={question}>{question}</option>
                            ))}
                        </select>

                        {/* Recovery Answer */}
                        <label htmlFor="recoveryAnswer">Answer to Recovery Question</label>
                        {errors.recoveryAnswer && <p className="error-text">{errors.recoveryAnswer}</p>}
                        <input
                            type="text"
                            name="recoveryAnswer"
                            value={formData.recoveryAnswer}
                            onChange={handleChange}
                            placeholder="Enter your answer"
                            required
                        />

                        <button type="submit" className="login-button">Signup</button>
                        <p>
                            Already have an account? <Link to="/login">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
