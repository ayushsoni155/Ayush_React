import CryptoJS from 'crypto-js';
import React, { useState } from 'react';
import '../css/LogSign.css';
import { Link, useNavigate } from 'react-router-dom';
import Notification from './Notification';
import { useCookies } from 'react-cookie';

const secretKey = process.env.REACT_APP_SECRET_KEY; // Secret key for encryption
const encryptCookie = (data) => CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();

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
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [cookies, setCookie] = useCookies(['bytewiseCookies']);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const enrolmentRegex = /^0704CS(20|21|22|23|24|25|26)(1[0-2][0-9]{2}|1300)$/;
    const phoneRegex = /^[6789]\d{9}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

    const recoveryQuestions = [
        'Who is your bestfriend?',
        'Who is your favourite person?',
        'What is the name of your favorite teacher?',
        'What is your favorite dish?',
        'What is the city where you were born?',
    ];

    const [errorVibrated, setErrorVibrated] = useState({}); // Tracks fields that have vibrated for errors

const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedValue = name === 'enrolmentID' ? value.toUpperCase().trim() : value.trim();

    setFormData({
        ...formData,
        [name]: updatedValue,
    });

    let errorMessage = '';

    switch (name) {
        case 'enrolmentID':
            errorMessage = enrolmentRegex.test(updatedValue) ? '' : 'Invalid enrolment number format.';
            break;
        case 'phone':
            errorMessage = phoneRegex.test(updatedValue) ? '' : 'Invalid phone number format.';
            break;
        case 'password':
            errorMessage = passwordRegex.test(updatedValue)
                ? ''
                : 'Password must be at least 8 characters, including a number and a letter.';
            break;
        case 'confirmPassword':
            errorMessage = updatedValue === formData.password ? '' : 'Passwords do not match.';
            break;
        case 'recoveryAnswer':
            errorMessage = updatedValue.trim() ? '' : 'Recovery answer cannot be empty.';
            break;
        default:
            break;
    }

    setErrors({
        ...errors,
        [name]: errorMessage,
    });

    // Trigger vibration only if the error is new for this field
    if (errorMessage && !errorVibrated[name]) {
        navigator.vibrate([100, 50, 100]);
        setErrorVibrated({
            ...errorVibrated,
            [name]: true,
        });
    } else if (!errorMessage) {
        // Reset vibration status for the field if error is resolved
        setErrorVibrated({
            ...errorVibrated,
            [name]: false,
        });
    }
};

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        if (Object.values(errors).some((error) => error)) {
            setNotification({
                message: 'Please fix the errors before submitting.',
                type: 'error',
            });
            setLoading(false);
            return;
        }

        if (Object.values(formData).some((value) => !value.trim())) {
            setNotification({
                message: 'All fields are required. Please fill out all the data!',
                type: 'error',
            });
            navigator.vibrate([100, 50, 100]);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://bytewise-server.vercel.app/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                const cookieExpirationDate = new Date();
                cookieExpirationDate.setFullYear(cookieExpirationDate.getFullYear() + 5);

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
                    maxAge: 1296000,
                });

                navigate('/');
            } else {
                setNotification({ message: data.message || 'Error signing up', type: 'error' });
            }
        } catch (error) {
            setNotification({ message: 'Server error! Please try again.', type: 'error' });
        } finally {
            setLoading(false);
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
                        />

                        <label className={errors.enrolmentID ? "label-error" : ""} htmlFor="enrolmentID">Enrollment Number</label>
                        
                        <input
                            type="text"
                            id="enrolmentID"
                            name="enrolmentID"
                            value={formData.enrolmentID}
                            onChange={handleChange}
                            placeholder="Enter your enrollment number"
                            className={errors.enrolmentID ? "input-error" : ""}
                        />
                         {errors.enrolmentID && <p className="error-text">{errors.enrolmentID}</p>}
                        <label className={errors.phone ? "label-error" : ""} htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            autoComplete='phone'
                            className={errors.phone? "input-error" : ""}
                        />
{errors.phone && <p className="error-text">{errors.phone}</p>}
                        
                        <label htmlFor="sem">Select Semester</label>
                        <select
                            id="sem"
                            name="sem"
                            value={formData.sem}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select your semester</option>
                            {Array.from({ length: 8 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>Semester {index + 1}</option>
                            ))}
                        </select>

                        <label className={errors.password ? "label-error" : ""} htmlFor="password">Password</label>
                        <div className="password-input">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className={errors.password ? "input-error" : ""}
                            />
                            <button type="button" className={errors.password ? "errorpassword-toggle" : 'password-toggle'} onClick={togglePasswordVisibility}>
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.password && <p className="error-text">{errors.password}</p>}
                       
                        <label className={errors.confirmPassword ? "label-error" : ""} htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-input">
                            <input
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? "input-error" : ""}
                                placeholder="Confirm your password"
                            />
                            <button type="button"  className={errors.confirmPassword ? "errorpassword-toggle" : 'password-toggle'} onClick={toggleConfirmPasswordVisibility}>
                                {confirmPasswordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                       
                        <label   htmlFor="recoveryQuestion">Select a Recovery Question</label>
                        <select
                            id="recoveryQuestion"
                            name="recoveryQuestion"
                            value={formData.recoveryQuestion}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select a recovery question</option>
                            {recoveryQuestions.map((question, index) => (
                                <option key={index} value={question}>{question}</option>
                            ))}
                        </select>

                        <label className={errors.recoveryAnswer ? "label-error" : ""} htmlFor="recoveryAnswer">Answer to Recovery Question</label>
                        <input
                            type="text"
                            id="recoveryAnswer"
                            name="recoveryAnswer"
                            value={formData.recoveryAnswer}
                            onChange={handleChange}
                            className={errors.recoveryAnswer ? "input-error" : ""}
                            placeholder="Enter your answer"
                        
                        />
 {errors.recoveryAnswer && <p className="error-text">{errors.recoveryAnswer}</p>}
                        {loading?(<div class="Loginloading"></div>):(
                        <button type="submit" className="login-button">Signup</button>)}
                        <span>Already have an account? </span>
                        <Link to="/login">Login</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
