import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Notification from './Notification';
import '../css/Feedback.css';

export default function Feedback() {
  const [cookies] = useCookies(['bytewiseCookies']);
  const [formData, setFormData] = useState({
    name: '',
    enrolmentID: '',
    message: '',
  });
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false
  });

  useEffect(() => {
    const userData = cookies.bytewiseCookies;
    if (userData) {
      setFormData({
        name: userData.name || '',
        enrolmentID: userData.enrolmentID || '',
        message: '',
      });
    }
  }, [cookies]);

  const handleMessageChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      message: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cookies.bytewiseCookies || !cookies.bytewiseCookies.status) {
      setNotification({
        message: 'You must be logged in to submit feedback.',
        type: 'error',
        visible: true
      });
      return;
    }

    const feedbackData = {
      name: formData.name,
      enrolmentID: formData.enrolmentID,
      message: formData.message,
    };

    try {
      const response = await fetch('http://localhost:3000/feedback-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        setNotification({
            message: 'Feedback submitted successfully.',
            type: 'success',
            visible: true
        });
        setFormData((prevData) => ({
            ...prevData,
            message: '',
        }));
    } else {
        console.log('Setting error notification');
        setNotification({
            message: 'Error submitting feedback.',
            type: 'error',
            visible: true
        });
    }
    
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setNotification({
        message: 'Error submitting feedback. Please try again later.',
        type: 'error',
        visible: true
      });
    }
  };

  return (
    <>
      {notification.visible && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, visible: false })}
        />
      )}

      {cookies.bytewiseCookies && cookies.bytewiseCookies.status ? (
        <div className="feedback-section">
          <h2 className="feedback-heading">We Value Your Feedback</h2>
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                readOnly
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="enrolment">Enrolment:</label>
              <input
                type="text"
                id="enrolment"
                name="enrolment"
                value={formData.enrolmentID}
                readOnly
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleMessageChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      ) : (
        <div className="feedback-section">
          <h2 className="feedback-heading">Please log in to provide feedback.</h2>
        </div>
      )}
    </>
  );
}
