import React, { useState } from 'react';
import './SignupForm.css';
import './EditDropDown.css';
import Alert from './Alert.jsx';

function EditDropDown({ handleSignupClose, changesignupdisplay, changesignuptop, DBUSER , updatePASSWORD2}) {
    const userName = localStorage.getItem("UserName");
    const [showstrongpass, setStrongPass] = useState('none');
    const [passwordType, setPasswordType] = useState('password');
    const [oldpass, setOLDPASS] = useState('');
    const [newpass, setNEWpass] = useState('');
    const [newpasscon, setNEWPASS] = useState('');
    const [alertvis, setalertvis] = useState('none');
    const [alertvis2, setalertvis2] = useState('none');
    const [isBlinking1, setIsBlinking1] = useState(false);
    const [isBlinking2, setIsBlinking2] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    }

    const showpassticks = () => {
        setStrongPass('block');
    }

    const hidepassticks = () => {
        setStrongPass('none');
    }

    const [strengthIndicators, setStrengthIndicators] = useState({
        min8char: false,
        con2: false,
        con3: false,
        con4: false,
        con5: false
    });

    const checkstrongpass = async (event) => {
        let password = event.target.value;
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        setStrengthIndicators({
            min8char: password.length >= minLength,
            con2: hasUpperCase,
            con3: hasLowerCase,
            con4: hasNumber,
            con5: hasSpecialChar
        });
        setNEWpass(password);
    }

    const OLDPASSWORD = (event) => {
        setOLDPASS(event.target.value);
    }

    const NEWPASSCON = (event) => {
        setNEWPASS(event.target.value);
    }

    const onFocusOLDPASS = () => {
        setalertvis('none');
    }

    const onFocusNEWPASS = () => {
        setalertvis2('none');
    }

    const updatePASSWORD = async () => {
        if (oldpass === DBUSER && newpass === newpasscon) {
            updatePASSWORD2();
            try {
                const response = await fetch(`http://localhost:8087/users/${userName}/password`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userPassword: newpasscon })
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(errorMessage);
                }
                console.log('Password updated successfully');
            } catch (error) {
                console.error('Failed to update password:', error.message);
            }
        } else {
            if (oldpass !== DBUSER) {
                setalertvis('block');
                setIsBlinking1(true);
            }
            if (newpass !== newpasscon) {
                setalertvis2('block');
                setIsBlinking2(true);
            }
        }
    }

    return (
        <>
            <div className="overlay" id="overlay" style={{ display: changesignupdisplay }}></div>
            <div className="modal" id="modal" style={{ top: changesignuptop }}>
                <div className="modal-content">
                    <span className="close" id="closebtn" onClick={handleSignupClose}>&times;</span>

                    <div className="allcontentcontainer">
                        <form id="signupform">
                            <input type={passwordType} className="inputboxcss" id="passworddiv" placeholder="Old Password" name="userPassword"
                                onChange={OLDPASSWORD} onFocus={onFocusOLDPASS}
                                style={{ marginTop: "20px" }} /><br />
                            <div className="dropdown" id="showPasswordCheckbox" style={{ marginBottom: "10px" }}>
                                <input type="checkbox" id="checkboxtoshowpass" onChange={togglePasswordVisibility}
                                />Show Password
                            </div>
                            <Alert alertvis={alertvis} INNERTEXT={"Old Password is Wrong !!!"} isBlinking={isBlinking1} />

                            <input type={passwordType} className="inputboxcss" id="passworddiv" placeholder="New Password" name="userPassword"
                                onFocus={showpassticks} onBlur={hidepassticks} onChange={checkstrongpass} /><br />
                            <div className="dropdown" id="showPasswordCheckbox">
                                <input type="checkbox" id="checkboxtoshowpass" onChange={togglePasswordVisibility} />Show Password
                            </div>
                            <div className="passcheckboxes" style={{ display: showstrongpass}}>
                                <span className="tickbox" id="min8char" style={{ color: strengthIndicators.min8char ? 'Green' : 'Red' }}>
                                    {strengthIndicators.min8char ? '✓' : '✕'}</span>
                                <label className="strongpass" id="min8chartext" style={{ color: strengthIndicators.min8char ? 'Green' : 'Red' }}>
                                    Minimum 8 characters</label><br />
                                <span className="tickbox" id="con2" style={{ color: strengthIndicators.con2 ? 'Green' : 'Red' }}>
                                    {strengthIndicators.con2 ? '✓' : '✕'}</span>
                                <label className="strongpass" id="con2text" style={{ color: strengthIndicators.con2 ? 'Green' : 'Red' }}>
                                    At least one uppercase letter</label><br />
                                <span className="tickbox" id="con3" style={{ color: strengthIndicators.con3 ? 'Green' : 'Red' }}>
                                    {strengthIndicators.con3 ? '✓' : '✕'}</span>
                                <label className="strongpass" id="con3text" style={{ color: strengthIndicators.con3 ? 'Green' : 'Red' }}>
                                    At least one lowercase letter</label><br />
                                <span className="tickbox" id="con4" style={{ color: strengthIndicators.con4 ? 'Green' : 'Red' }}>
                                    {strengthIndicators.con4 ? '✓' : '✕'}</span>
                                <label className="strongpass" id="con4text" style={{ color: strengthIndicators.con4 ? 'Green' : 'Red' }}>
                                    At least one number</label><br />
                                <span className="tickbox" id="con5" style={{ color: strengthIndicators.con5 ? 'Green' : 'Red' }}>
                                    {strengthIndicators.con5 ? '✓' : '✕'}</span>
                                <label className="strongpass" id="con5text" style={{ color: strengthIndicators.con5 ? 'Green' : 'Red' }}>
                                    At least one special character</label>
                            </div>
                            <Alert alertvis={alertvis2} INNERTEXT={"Password is not matching !!!"} isBlinking={isBlinking2} />
                            <input type={passwordType} className="inputboxcss" id="passworddiv" placeholder="Confirm New Password" name="userPassword"
                                onChange={NEWPASSCON} onFocus={onFocusNEWPASS} /><br />
                            <div className="dropdown" id="showPasswordCheckbox">
                                <input type="checkbox" id="checkboxtoshowpass" onChange={togglePasswordVisibility} />Show Password
                            </div>
                            <button type="button" id="signupbutton" onClick={updatePASSWORD}>Change Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditDropDown;
