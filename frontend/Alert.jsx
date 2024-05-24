import React, { useState, useEffect } from 'react';
import './Alert.css';

function Alert({ alertvis, INNERTEXT, isBlinking }) {
    const [blinking, setBlinking] = useState(false);

    useEffect(() => {
        if (isBlinking) {
            setBlinking(true);
            const timer = setTimeout(() => setBlinking(false), 1000); 
            return () => clearTimeout(timer);
        }
    }, [isBlinking]);

    return (
        <div className={`alertforOldPass ${blinking ? 'blinking-border' : ''}`}
            style={{ display: alertvis }}>
            {INNERTEXT}
        </div>
    );
}

export default Alert;
