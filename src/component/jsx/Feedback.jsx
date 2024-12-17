import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Notification from "./Notification";
import CryptoJS from "crypto-js";
import "../css/Feedback.css";

const secretKey = process.env.REACT_APP_SECRET_KEY; // Your secret key for encryption/decryption

export default function Feedback() {
  const [cookies] = useCookies(["bytewiseCookies"]);
  const [formData, setFormData] = useState({
    name: "",
    enrolmentID: "",
    message: "",
  });
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const decryptCookie = (encryptedCookie) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedCookie, secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } catch (error) {
      console.error("Error decrypting cookie:", error);
      return null;
    }
  };

  useEffect(() => {
    const encryptedCookie = cookies.bytewiseCookies;
    if (encryptedCookie) {
      const userData = decryptCookie(encryptedCookie);
      if (userData) {
        setFormData({
          name: userData.name || "",
          enrolmentID: userData.enrolmentID || "",
          message: "",
        });
      }
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

    // Check if user is logged in
    const encryptedCookie = cookies.bytewiseCookies;
    if (!encryptedCookie || !decryptCookie(encryptedCookie)?.status) {
      setNotification({
        message: "You must be logged in to submit feedback.",
        type: "error",
        visible: true,
      });
      return;
    }

    const feedbackData = {
      name: formData.name,
      enrolmentID: formData.enrolmentID,
      feedback: formData.message, // Backend expects 'feedback' field
    };

    try {
      const response = await fetch(
        "https://bytewise-server.vercel.app/api/feedback-submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        }
      );

      if (response.ok) {
        setNotification({
          message: "Feedback submitted successfully.",
          type: "success",
          visible: true,
        });
        setFormData((prevData) => ({
          ...prevData,
          message: "",
        }));
      } else {
        setNotification({
          message: "Error submitting feedback.",
          type: "error",
          visible: true,
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setNotification({
        message: "Error submitting feedback. Please try again later.",
        type: "error",
        visible: true,
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

      {cookies.bytewiseCookies && decryptCookie(cookies.bytewiseCookies)?.status ? (
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
              <label htmlFor="enrolment">Enrolment ID:</label>
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
            <button type="submit" className="submit-btn">
              Submit
            </button>
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
