import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import '../css/Profile.css';

const Profile = () => {
    const [formData, setFormData] = useState({
        enrolmentID: '',
        name: '',
        sem: '',
        phone: '',
    });
    const [notification, setNotification] = useState(null);
    const [cookies, removeCookie] = useCookies(['bytewiseCookies']);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = cookies.bytewiseCookies;
        if (userData) {
            setFormData({
                enrolmentID: userData.enrolmentID,
                name: userData.name,
                sem: userData.sem,
                phone: userData.phone,
            });
        }
    }, [cookies]);
    const handleLogout = () => {
        // Log current cookies to check if bytewiseCookies exists
        console.log('Current cookies before logout:', cookies);
    
        // Check if the cookie exists before trying to remove it
        if (cookies.bytewiseCookies) {
            removeCookie('bytewiseCookies'); // Ensure the path matches where it was set
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
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
};

export default Profile;
