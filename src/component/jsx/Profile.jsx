import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import '../css/Profile.css';
import CryptoJS from 'crypto-js'; // Import CryptoJS for decryption

const Profile = () => {
    const [formData, setFormData] = useState({
        enrolmentID: '',
        name: '',
        sem: '',
        phone: '',
    });
    const [notification, setNotification] = useState(null);
    const [cookies, setCookie] = useCookies(['bytewiseCookies']);
    const navigate = useNavigate();
const secretKey = process.env.REACT_APP_SECRET_KEY; // Encryption secret key

    // Utility function to decrypt cookies
    const decryptCookie = (encryptedValue) => {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            console.error('Error decrypting cookie:', error);
            return null;
        }
    };

    useEffect(() => {
        const encryptedData = cookies.bytewiseCookies;
        if (encryptedData) {
            const userData = decryptCookie(encryptedData);
            if (userData && userData.status) { // Check if user is logged in
                setFormData({
                    enrolmentID: userData.enrolmentID,
                    name: userData.name,
                    sem: userData.sem,
                    phone: userData.phone,
                });
            } else {
                navigate('/login'); // Redirect if not logged in
            }
        } else {
            navigate('/login'); // Redirect if no cookie exists
        }
    }, [cookies, navigate]);

    const handleLogout = () => {
        if (cookies.bytewiseCookies) {
            // Set status to false instead of removing the cookie
            const encryptedData = cookies.bytewiseCookies;
            const userData = decryptCookie(encryptedData);
            if (userData) {
                userData.status = false; // Update status to false on logout
                const reEncryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), secretKey).toString();
                setCookie('bytewiseCookies', reEncryptedData, { path: '/', maxAge: 3600 });
            }

            setNotification({ message: 'You have been logged out!', type: 'success' });

            // Redirect after a brief delay
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } else {
            console.log('Cookie bytewiseCookies does not exist.');
        }
    };

    return (
        <>
            <div className="overlay" />

            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="profile-container">
                <button className="close-button" onClick={() => navigate('/login')}>X</button>
                <h2>Profile</h2>
                {formData.enrolmentID ? ( // Render profile details only if logged in
                    <>
                        <div className="form-group">
                            <label>Enrolment ID</label>
                            <p>{formData.enrolmentID}</p>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <p>{formData.name}</p>
                        </div>
                        <div className="form-group">
                            <label>Semester</label>
                            <p>{formData.sem}</p>
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <p>{formData.phone}</p>
                        </div>
                    </>
                ) : (
                    <p>You are not logged in. Please log in to view your profile.</p>
                )}
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
};

export default Profile;
