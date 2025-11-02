import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePageLinks.css';

function HomePageLinks({ handleLinkClick, handleLoginClick, handleSignupClick, visibility
    , showeUserProfile
}) {
    return (
        <div className="uppercontainer">
            <ul className="fixedWidthContainer">
                <li className="links" id="userprofileid" onClick={showeUserProfile}>
                    <Link to="/UserProfile" id="userProfileLink" className='links'>@Buso</Link>
                </li>
                <li className="links" id="createblogs" onClick={handleLinkClick}>Create blog</li>
                <li className="links" id="loginbtn1.03" onClick={handleLoginClick} style={{ visibility: visibility }}>Login</li>
                <li className="links" id="signupformopenbtn" onClick={handleSignupClick}>Signup</li>
            </ul>
        </div>
    );
};

export default HomePageLinks;
