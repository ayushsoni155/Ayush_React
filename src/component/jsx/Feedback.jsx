import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Notification from './Notification'; // Assuming you already have a Notification component
import '../css/Feedback.css';

export default function Feedback() {
  const [cookies] = useCookies(['bytewiseCookies']);
  const [formData, setFormData] = useState({
    name: '',
    enrolmentID: '',
    message: '',
  });
  const [notification, setNotification] = useState(null);

  // Fetch cookie data to prefill the form
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!cookies.bytewiseCookies || !cookies.bytewiseCookies.status) {
      setNotification({ message: 'You must be logged in to submit feedback.', type: 'error' });
      return;
    }

    const feedbackData = {
      name: formData.name,
      enrolmentID: formData.enrolmentID,
      message: formData.message,
    };

    console.log(feedbackData);
    // Handle form submission (e.g., send to backend)
    setNotification({ message: 'Feedback submitted successfully!', type: 'success' });
  };

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
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
                readOnly // Prefilled from cookies, no edit allowed
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
                readOnly // Prefilled from cookies, no edit allowed
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
