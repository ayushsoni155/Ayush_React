import React, { useState } from 'react';
import '../css/LogSign.css';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    enrolmentID: '',
    phone: '',
    recoveryAnswer: '', // Add recovery answer field
  });

  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({ enrolmentID: '', phone: '', recoveryAnswer: '' });
  const [recoveryQuestion, setRecoveryQuestion] = useState(''); // Store recovery question
  const [userID, setUserID] = useState(null); // Store user ID for password reset
  const navigate = useNavigate();

  const enrolmentRegex = /^0704CS(20|21|22|23|24|25|26)(1[0-2][0-9]{2}|1300)$/;
  const phoneRegex = /^[6-9]\d{9}$/;

 const handleChange = (event) => {
  const { name, value } = event.target;

  // If the field is 'enrolmentID', convert the value to uppercase
  const updatedValue = name === 'enrolmentID' ? value.toUpperCase() : value;

  // Validate input fields
  if (name === 'enrolmentID') {
    setErrors((prevErrors) => ({
      ...prevErrors,
      enrolmentID: enrolmentRegex.test(updatedValue) ? '' : 'Invalid enrollment number',
    }));
  }

  if (name === 'phone') {
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: phoneRegex.test(updatedValue) ? '' : 'Invalid phone number',
    }));
  }

  if (name === 'recoveryAnswer') {
    setErrors((prevErrors) => ({
      ...prevErrors,
      recoveryAnswer: updatedValue ? '' : 'Please provide an answer to the recovery question.',
    }));
  }

  setFormData({
    ...formData,
    [name]: updatedValue,
  });
};


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for any errors before submission
    if (errors.enrolmentID || errors.phone) {
      setNotification({ message: 'Please fix the errors before submitting.', type: 'error' });
      return;
    }

    if (!formData.enrolmentID || !formData.phone) {
      setNotification({ message: 'Enrolment ID and phone number are required.', type: 'error' });
      return;
    }

    try {
      // Send request to the backend to verify enrolmentID and phone
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
        setRecoveryQuestion(data.recoveryQuestion); // Store recovery question
        setUserID(data.userID); // Store userID
        setNotification({ message: 'Verification successful! Please answer the recovery question.', type: 'success' });
      } else {
        setNotification({ message: data.message, type: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({ message: 'An error occurred. Please try again later.', type: 'error' });
    }
  };

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();

    // Check if the recovery answer is provided
    if (!formData.recoveryAnswer) {
      setNotification({ message: 'Please provide an answer to the recovery question.', type: 'error' });
      return;
    }

    try {
      // Verify the recovery answer
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
          <img src="ForgetPassword.png" alt="Forgot Password" />
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

          {/* If recovery question is available, show it */}
          {recoveryQuestion && (
            <form onSubmit={handleAnswerSubmit}>
              <h3>{recoveryQuestion}</h3>
              <input
                type="text"
                name="recoveryAnswer"
                value={formData.recoveryAnswer}
                onChange={handleChange}
                placeholder="Answer the recovery question"
                required
              />
              <button type="submit" className="login-button">Submit Answer</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
