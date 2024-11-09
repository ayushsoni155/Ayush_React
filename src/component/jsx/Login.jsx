import React, { useState, useEffect } from 'react';
import '../css/LogSign.css';
import { Link, useNavigate } from 'react-router-dom';
import Notification from './Notification';
import { useCookies } from 'react-cookie';

const Login = () => {
    const [formData, setFormData] = useState({
        enrolmentID: '',
        password: '',
    });

    const [notification, setNotification] = useState(null);
    const [errors, setErrors] = useState({ enrolmentID: '', password: '' });
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['bytewiseCookies']);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const enrolmentRegex = /^0704CS\d{6,7}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

    useEffect(() => {
        if (cookies.bytewiseCookies && cookies.bytewiseCookies.status) {
            navigate('/');
        }
    }, [cookies, navigate]);

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

        if (name === 'password') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: passwordRegex.test(value) ? '' : 'Password must be at least 8 characters long and contain both letters and numbers'
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for any errors before submission
        if (errors.enrolmentID || errors.password) {
            setNotification({ message: 'Please fix the errors before submitting.', type: 'error' });
            return;
        }

        // Check if fields are empty
        if (!formData.enrolmentID || !formData.password) {
            setNotification({ message: 'Enrolment ID and password are required.', type: 'error' });
            return;
        }

        try {
            const response = await fetch('https://bytewise-server.vercel.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setNotification({ message: 'Login successful!', type: 'success' });
                setCookie('bytewiseCookies', {
                    enrolmentID: formData.enrolmentID,
                    name: data.user.name,
                    sem: data.user.sem,
                    phone: data.user.phone,
                    status: true // Set status to true on successful login
                }, { path: '/', maxAge: 3600 });
                navigate('/');
            } else {
                setNotification({ message: data.message || 'Login failed. Please check your credentials.', type: 'error' });
                setCookie('bytewiseCookies', {
                    ...cookies.bytewiseCookies,
                    status: false // Set status to false on failed login
                }, { path: '/', maxAge: 3600 });
            }
        } catch (error) {
            console.error('Login error:', error);
            setNotification({ message: 'An error occurred. Please try again later.', type: 'error' });
            setCookie('bytewiseCookies', {
                ...cookies.bytewiseCookies,
                status: false // Set status to false on error
            }, { path: '/', maxAge: 3600 });
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    return (
        <div className="overlay">
            <button className="close-button" onClick={() => navigate('/')}>X</button>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            <div className="logSign-container">
                <div className="logSign-img-container">
                    <img src="Login.png" alt="Login" />
                </div>
                <div className="logSign-form-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='enrolmentID'>Enrollment Number</label>
                        {errors.enrolmentID && <p className="error-text">{errors.enrolmentID}</p>}
                        <input
                            type="text"
                            id="enrolmentID"
                            name="enrolmentID"
                            value={formData.enrolmentID}
                            onChange={handleChange}
                            style={{ textTransform: 'uppercase' }}
                            placeholder="Enter your enrollment number"
                            required
                        />

                        <label htmlFor='password'>Password</label>
                        {errors.password && <p className="error-text">{errors.password}</p>}
                        <div className="password-input">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                            <button type="button" onClick={togglePasswordVisibility}>
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        <button type="submit" className="login-button">Login</button>

                        <div className="additional-links">
                            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                            <span>New user? Create account - 
                                <Link to='/signup' className='signup-link'>Sign Up</Link>       
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
