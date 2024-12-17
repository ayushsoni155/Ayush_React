import CryptoJS from 'crypto-js';
import React, { useState } from 'react';
import '../css/LogSign.css';
import { Link, useNavigate } from 'react-router-dom';
import Notification from './Notification';
import { useCookies } from 'react-cookie';

const secretKey = process.env.REACT_APP_SECRET_KEY; // Secret key for encryption
const encryptCookie = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decryptCookie = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const Signup = () => {
    const [formData, setFormData] = useState({
        enrolmentID: '',
        name: '',
        sem: '',
        phone: '',
        password: '',
        confirmPassword: '',
        recoveryQuestion: '',
        recoveryAnswer: '',
    });

    const [notification, setNotification] = useState(null);
    const [errors, setErrors] = useState({
        enrolmentID: '',
        phone: '',
        password: '',
        confirmPassword: '',
        recoveryAnswer: '',
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const enrolmentRegex = /^0704CS(20|21|22|23|24|25|26)(1[0-2][0-9]{2}|1300)$/;
    const phoneRegex = /^[6789]\d{9}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    const [cookies, setCookie] = useCookies(['bytewiseCookies']);
    const navigate = useNavigate();

    const recoveryQuestions = [
        'Who is your bestfriend?',
        'Who is your favourite person?',
        'What is the name of your favorite teacher?',
        'What is your favorite dish?',
        'What is the city where you were born?',
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedValue = name === 'enrolmentID' ? value.toUpperCase() : value;

        // Update form data
        setFormData({
            ...formData,
            [name]: updatedValue,
        });

        // Validation logic
        switch (name) {
            case 'enrolmentID':
                setErrors({
                    ...errors,
                    enrolmentID: enrolmentRegex.test(updatedValue)
                        ? ''
                        : 'Invalid enrolment number format.',
                });
                break;
            case 'phone':
                setErrors({
                    ...errors,
                    phone: phoneRegex.test(updatedValue)
                        ? ''
                        : 'Invalid phone number format.',
                });
                break;
            case 'password':
                setErrors({
                    ...errors,
                    password: passwordRegex.test(updatedValue)
                        ? ''
                        : 'Password must be at least 8 characters, including a number and a letter.',
                });
                break;
            case 'confirmPassword':
                setErrors({
                    ...errors,
                    confirmPassword:
                        updatedValue === formData.password
                            ? ''
                            : 'Passwords do not match.',
                });
                break;
            case 'recoveryAnswer':
                setErrors({
                    ...errors,
                    recoveryAnswer: updatedValue.trim()
                        ? ''
                        : 'Recovery answer cannot be empty.',
                });
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (Object.values(errors).some((error) => error)) {
            setNotification({
                message: 'Please fix the errors before submitting.',
                type: 'error',
            });
            return;
        }

        const formDataWithRecovery = {
            ...formData,
            recoveryQuestion: formData.recoveryQuestion,
            recoveryAnswer: formData.recoveryAnswer,
        };

        try {
            const response = await fetch(
                'https://bytewise-server.vercel.app/api/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataWithRecovery),
                }
            );

            const data = await response.json();

            if (response.ok) {
                const cookieExpirationDate = new Date();
                cookieExpirationDate.setFullYear(
                    cookieExpirationDate.getFullYear() + 5
                );

                setNotification({ message: 'Signup successful!', type: 'success' });

                const encryptedData = encryptCookie({
                    enrolmentID: formData.enrolmentID,
                    name: formData.name,
                    sem: formData.sem,
                    phone: formData.phone,
                    status: true,
                });

                setCookie('bytewiseCookies', encryptedData, {
                    path: '/',
                    maxAge: 1296000, // 15 days
                });

                const encryptedSignupStatus = encryptCookie('done');

                setCookie('signupStatus', encryptedSignupStatus, {
                    path: '/',
                    expires: cookieExpirationDate,
                });

                setFormData({
                    enrolmentID: '',
                    name: '',
                    sem: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    recoveryQuestion: '',
                    recoveryAnswer: '',
                });

                navigate('/');
            } else {
                setNotification({ message: data.message || 'Error signing up', type: 'error' });
            }
        } catch (error) {
            setNotification({
                message: 'Server error! Please try again.',
                type: 'error',
            });
        }
    };

    const togglePasswordVisibility = () =>
        setPasswordVisible((prev) => !prev);
    const toggleConfirmPasswordVisibility = () =>
        setConfirmPasswordVisible((prev) => !prev);

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

                        <label htmlFor="recoveryQuestion">Select a Recovery Question</label>
                        <select
                            id="recoveryQuestion"
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

                        <label htmlFor="recoveryAnswer">Answer to Recovery Question</label>
                        {errors.recoveryAnswer && <p className="error-text">{errors.recoveryAnswer}</p>}
                        <input
                            type="text"
                            id="recoveryAnswer"
                            name="recoveryAnswer"
                            value={formData.recoveryAnswer}
                            onChange={handleChange}
                            placeholder="Enter your answer"
                            required
                        />

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
