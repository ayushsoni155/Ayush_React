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

  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({ enrolmentID: '', phone: '', recoveryAnswer: '' });
  const [recoveryQuestion, setRecoveryQuestion] = useState('');
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationCompleted, setVerificationCompleted] = useState(false);

  const navigate = useNavigate();

  const enrolmentRegex = /^0704CS(20|21|22|23|24|25|26)(1[0-2][0-9]{2}|1300)$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedValue = name === 'enrolmentID' ? value.toUpperCase().trim() : value.trim();

    if (name === 'enrolmentID') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        enrolmentID: enrolmentRegex.test(updatedValue) ? '' : 'Invalid enrollment number',
      }));
      navigator.vibrate([100, 50, 100]);
    }

    if (name === 'phone') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: phoneRegex.test(updatedValue) ? '' : 'Invalid phone number',
      }));
      navigator.vibrate([100, 50, 100]);
    }

    if (name === 'recoveryAnswer') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        recoveryAnswer: updatedValue ? '' : 'Please provide an answer to the recovery question.',
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
    setLoading(true);

    if (errors.enrolmentID || errors.phone) {
      setNotification({ message: 'Please fix the errors before submitting.', type: 'error' });
      setLoading(false);
      return;
    }

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
        setNotification({ message: 'Verification successful! Please answer the recovery question.', type: 'success' });
      } else {
        setNotification({ message: data.message, type: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({ message: 'An error occurred. Please try again later.', type: 'error' });
    }
    setLoading(false);
  };

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!formData.recoveryAnswer) {
      setNotification({ message: 'Please provide an answer to the recovery question.', type: 'error' });
      setLoading(false);
      return;
    }

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
        setNotification({ message: 'Answer verified! You can now reset your password.', type: 'success' });
         localStorage.setItem('enrolID', userID);
        navigate('/reset-password');
      } else {
        setNotification({ message: data.message, type: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({ message: 'An error occurred. Please try again later.', type: 'error' });
    }
    setLoading(false);
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
          <img src="ForgetPassword.png" alt="Forgot Password" />
        </div>
        <div className="logSign-form-container">
          <h2>Forgot Password</h2>
          <form onSubmit={verificationCompleted ? handleAnswerSubmit : handleSubmit}>
            {!verificationCompleted && (
              <>
                <label htmlFor="enrolmentID"  className={errors.enrolmentID ? "label-error" : ""}>Enrollment Number</label>
                <input
                  type="text"
                  id="enrolmentID"
                  name="enrolmentID"
                  value={formData.enrolmentID}
                  onChange={handleChange}
                   className={errors.enrolmentID ? "input-error" : ""}
                  placeholder="Enter your enrollment number"
                />
                {errors.enrolmentID && <p className="error-text">{errors.enrolmentID}</p>}
                <label htmlFor="phone" className={errors.phone ? "label-error" : "">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                   className={errors.phone ? "input-error" : ""}
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
                  className={errors.recoveryAnswer ? "input-error" : ""}
                
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
