import React, { useEffect, useState } from 'react';
import "../styles/notification.css"

interface NotificationProps {
    message: string;
    type: 'error' | 'success';
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false); // Start hiding animation
            setTimeout(onClose, 300); // Remove the notification after animation ends
        }, 3000);

        return () => clearTimeout(timer); // Clear timeout if component unmounts
    }, [onClose]);

    return (
        <div className={`notification ${type} ${visible ? 'show' : 'hide'}`}>
            {message}
        </div>
    );
};

export default Notification;
