import React, { useState } from 'react';
import '../css/LogSign.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    enrolmentID: '',
    phone: '',
    recoveryAnswer: '',
  });
  const [errors, setErrors] = useState({});
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

  // Input change handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value.trim() }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // Validation logic
  const validateFields = () => {
    const newErrors = {};
    if (!formData.enrolmentID || !enrolmentRegex.test(formData.enrolmentID)) {
      newErrors.enrolmentID = 'Invalid enrollment number.';
    }
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number.';
    }
    if (verificationCompleted && !formData.recoveryAnswer) {
      newErrors.recoveryAnswer = 'Please provide an answer to the recovery question.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission for details verification
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      const response = await fetch('https://bytewise-server.vercel.app/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrolmentID: formData.enrolmentID, phone: formData.phone }),
      });
      const data = await response.json();

      if (response.ok) {
        setRecoveryQuestion(data.recoveryQuestion);
        setUserID(data.userID);
        setVerificationCompleted(true);
      } else {
        setErrors({ general: data.message });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again later.' });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle recovery answer submission
  const handleAnswerSubmit = async (event) => {
    event.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      const response = await fetch('https://bytewise-server.vercel.app/api/verify-recovery-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID, recoveryAnswer: formData.recoveryAnswer }),
      });
      const data = await response.json();

      if (response.ok) {
        setSessionData('resetData', { enrolID: userID, verificationStatus: 'isverified' }, 5 * 60 * 1000);
        navigate('/reset-password');
      } else {
        setErrors({ recoveryAnswer: data.message });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again later.' });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
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
          {errors.general && <p className="error-text">{errors.general}</p>}
          <form onSubmit={verificationCompleted ? handleAnswerSubmit : handleSubmit}>
            {!verificationCompleted && (
              <>
                <label htmlFor="enrolmentID">Enrollment Number</label>
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

                <label htmlFor="phone">Phone Number</label>
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
                  className={errors.recoveryAnswer ? 'input-error' : ''}
                  placeholder="Answer the recovery question"
                />
                {errors.recoveryAnswer && <p className="error-text">{errors.recoveryAnswer}</p>}
              </>
            )}
            {loading ? (
              <div className="loading-spinner"></div>
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
