import CryptoJS from 'crypto-js';
import React, { useState } from 'react';
import '../css/LogSign.css';
import { Link, useNavigate } from 'react-router-dom';
import Notification from './Notification'; 
import { useCookies } from 'react-cookie';

const secretKey = '@@@@1234@bytewise24'; // Your secret key for encryption

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
        recoveryAnswer: ''
    });

    const [notification, setNotification] = useState(null);
    const [errors, setErrors] = useState({
        enrolmentID: '',
        phone: '',
        password: '',
        confirmPassword: '',
        recoveryAnswer: ''
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
        'What is the city where you were born?'
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedValue = name === 'enrolmentID' ? value.toUpperCase() : value;

        setFormData({
            ...formData,
            [name]: updatedValue
        });

        // Validation logic ...
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (errors.enrolmentID || errors.phone || errors.password || errors.confirmPassword || errors.recoveryAnswer) {
            setNotification({ message: 'Please fix the errors before submitting.', type: 'error' });
            return;
        }

        const formDataWithRecovery = { 
            ...formData,
            recoveryQuestion: formData.recoveryQuestion, 
            recoveryAnswer: formData.recoveryAnswer 
        };

        try {
            const response = await fetch('https://bytewise-server.vercel.app/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataWithRecovery)
            });

            const data = await response.json();

            if (response.ok) {
                setNotification({ message: 'Signup successful!', type: 'success' });

                const encryptedData = encryptCookie({
                    enrolmentID: formData.enrolmentID,
                    name: formData.name,
                    sem: formData.sem,
                    phone: formData.phone,
                    status: true
                });

                setCookie('bytewiseCookies', encryptedData, { path: '/', maxAge: 1296000 });

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
            setNotification({ message: 'Server error! Please try again.', type: 'error' });
        }
    };

    const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible((prev) => !prev);

    return (
        // JSX structure ...
    );
};

export default Signup;
