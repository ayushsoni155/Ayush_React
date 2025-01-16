
import React, { useState } from 'react';
import '../css/LogSign.css';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    enrolmentID: '',
    phone: '',
    recoveryAnswer: '',
  });

  const [errors, setErrors] = useState({ enrolmentID: '', phone: '', recoveryAnswer: '' });
  const [recoveryQuestion, setRecoveryQuestion] = useState('');
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationCompleted, setVerificationCompleted] = useState(false);

  const navigate = useNavigate();

  const enrolmentRegex = /^0704CS(20|21|22|23|24|25|26)(1[0-2][0-9]{2}|1300)$/;
  const phoneRegex = /^[6-9]\d{9}$/;
   // Utility to set session data with expiry
  const setSessionData = (key, value, ttl) => {
    const expiryTime = Date.now() + ttl; // TTL in milliseconds
    sessionStorage.setItem(key, JSON.stringify({ value, expiry: expiryTime }));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedValue = name === 'enrolmentID' ? value.toUpperCase().trim() : value.trim();

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    if (name === 'enrolmentID' && !enrolmentRegex.test(updatedValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        enrolmentID: 'Invalid enrollment number',
      }));
      navigator.vibrate([100, 50, 100]);
    }

    if (name === 'phone' && !phoneRegex.test(updatedValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: 'Invalid phone number',
      }));
      navigator.vibrate([100, 50, 100]);
    }

    if (name === 'recoveryAnswer' && updatedValue.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        recoveryAnswer: 'Please provide an answer to the recovery question.',
      }));
      navigator.vibrate([100, 50, 100]);
    }

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (errors.enrolmentID || errors.phone || !formData.enrolmentID || !formData.phone) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        enrolmentID: formData.enrolmentID ? prevErrors.enrolmentID : 'Enrollment number is required.',
        phone: formData.phone ? prevErrors.phone : 'Phone number is required.',
      }));
      navigator.vibrate([200]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://bytewise-server.vercel.app/api/forgot-password', {
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

      if (response.ok) {
        setRecoveryQuestion(data.recoveryQuestion);
        setUserID(data.userID);
        setVerificationCompleted(true);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          enrolmentID: data.message.includes('enrollment') ? data.message : '',
          phone: data.message.includes('phone') ? data.message : '',
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();

    if (!formData.recoveryAnswer) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        recoveryAnswer: 'Please provide an answer to the recovery question.',
      }));
      navigator.vibrate([200]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://bytewise-server.vercel.app/api/verify-recovery-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID,
          recoveryAnswer: formData.recoveryAnswer,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSessionData('resetData', { enrolID: userID, verificationStatus: 'isverified' }, 5 * 60 * 1000);
        navigate('/reset-password');
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          recoveryAnswer: data.message,
        }));
         navigator.vibrate([100, 50, 100]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="overlay">
      <button className="close-button" onClick={() => navigate('/login')}>X</button>
      <div className="logSign-container">
        <div className="logSign-img-container">
          <img src="ForgetPassword.png" alt="Forgot Password" />
        </div>
        <div className="logSign-form-container">
          <h2>Forgot Password</h2>
          <form onSubmit={verificationCompleted ? handleAnswerSubmit : handleSubmit}>
            {!verificationCompleted && (
              <>
                <label htmlFor="enrolmentID" className={errors.enrolmentID ? 'label-error' : ''}>
                  Enrollment Number
                </label>
                <input
                  type="text"
                  id="enrolmentID"
                  name="enrolmentID"
                  value={formData.enrolmentID}
                  onChange={handleChange}
                  className={errors.enrolmentID ? 'input-error' : ''}
                  placeholder="Enter your enrollment number"
                />
                {errors.enrolmentID && <p className="error-text">{errors.enrolmentID}</p>}
                <label htmlFor="phone" className={errors.phone ? 'label-error' : ''}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'input-error' : ''}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </>
            )}
            {verificationCompleted && (
              <>
                <h3>{recoveryQuestion}</h3>
                <input
                  type="text"
                  name="recoveryAnswer"
                  value={formData.recoveryAnswer}
                  onChange={handleChange}
                  placeholder="Answer the recovery question"
                  className={errors.recoveryAnswer ? 'input-error' : ''}
                />
                {errors.recoveryAnswer && <p className="error-text">{errors.recoveryAnswer}</p>}
              </>
            )}
            {loading ? (
              <div className="Loginloading"></div>
            ) : (
              <button type="submit" className="login-button">
                {verificationCompleted ? 'Submit Answer' : 'Verify Details'}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
