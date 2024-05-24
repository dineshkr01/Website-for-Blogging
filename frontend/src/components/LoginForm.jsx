import React, { useState } from 'react';
import './LoginForm.css';


function LoginForm({ handleLoginButtonClick, changedisplay, changetop , loginUser , updateusername , updateuserpass}) {

    
    return (
        <>
            <div className="overlay2" id="overlay2" style={{ display: changedisplay }}></div>
            <div className="modal2" id="modal2" style={{ top: changetop }}>
                <div className="modal-content2">
                    <span className="close2" id="closebtn2" onClick={handleLoginButtonClick}>&times;</span>
                    <div className="allcontentcontainer2">
                        <span id="heading2">Login</span>
                        <form id="signupform2">
                            <input type="text" className="inputboxcss2" id="username2" placeholder="Username" name="userName2"
                                onChange={updateusername} /><br />
                            <input type="password" className="inputboxcss2" id="passworddiv2" placeholder="Password" name="userPassword2"
                                onChange={updateuserpass} /><br />
                            <div className="dropdown2" id="showPasswordCheckbox2">
                                <input type="checkbox" id="checkboxtoshowpass2" />Show Password
                            </div><br />
                            <div><a id="forgetpasspara">Forgot Password?</a></div>
                            <button type="button" id="signupbutton2" onClick={loginUser}>Login</button>
                            <div>
                                <span id="notamember">Not a Member?</span>
                                <a id="notamembersignup">Sign Up</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
