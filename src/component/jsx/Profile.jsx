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
    const [cookies, setCookie] = useCookies(['bytewiseCookies']);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = cookies.bytewiseCookies;
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
    }, [cookies, navigate]);

    const handleLogout = () => {
        console.log('Current cookies before logout:', cookies);

        if (cookies.bytewiseCookies) {
            // Set status to false instead of removing the cookie
            setCookie('bytewiseCookies', {
                ...cookies.bytewiseCookies,
                status: false // Update status to false on logout
            }, { path: '/', maxAge: 3600 });

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
                {cookies.bytewiseCookies && cookies.bytewiseCookies.status ? ( // Check status
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
