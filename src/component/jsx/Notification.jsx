import React, { useState, useEffect } from 'react';
import '../css/Notification.css';

const Notification = ({ message, type = 'info', onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Trigger vibration when notification is visible
        if (isVisible && navigator.vibrate) {
            navigator.vibrate([300, 200, 300]);
        }

        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`notification ${type}`}>
            <p>{message}</p>
            <button onClick={() => {
                setIsVisible(false);
                if (onClose) onClose();
            }}>
                X
            </button>
        </div>
    );
};

export default Notification;