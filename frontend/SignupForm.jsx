import React, { useState } from 'react';
import './SignupForm.css';

function SignupForm({ handleSignupClose, changesignupdisplay, changesignuptop }) {
    const [showstrongpass, setStrongPass] = useState('none');
    const [passwordType, setPasswordType] = useState('password');
    const [showsquestions, setdropdownsq] = useState('');
    const [securityquestiontext, setupdatesq] = useState('');
    const [flag, setflag] = useState(0);
    const [droptriangle, setdroptriangle] = useState('block');
    const [addOrremoveClass, setaddOrRemove] = useState('');

    const [username01, setusername] = useState();
    const [useremail01, setuseremail] = useState();
    const [userpassword01, setuserpass] = useState();
    const [userquestion01, setuserq] = useState();
    const [useranswer01, setuserans] = useState();


    const updateusername = (event) => {
        setusername(event.target.value);
        console.log(event.target.value);
    }

    const updateuseremail = (event) => {
        setuseremail(event.target.value);
    }

    const updateuserans = (event) => {
        setuserans(event.target.value);
    }


    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    }

    const showpassticks = () => {
        setStrongPass('block');
    }


    const hidepassticks = () => {
        // setStrongPass('none');
    }


    const [strengthIndicators, setStrengthIndicators] = useState({
        min8char: false,
        con2: false,
        con3: false,
        con4: false,
        con5: false
    });


    const checkstrongpass = (event) => {
        const password = event.target.value;
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        setuserpass(event.target.value);

        setStrengthIndicators({
            min8char: password.length >= minLength,
            con2: hasUpperCase,
            con3: hasLowerCase,
            con4: hasNumber,
            con5: hasSpecialChar
        });
    }


    const showdropdownsq = () => {
        console.log("Dropping down questions list");
        if (showsquestions === 'block') {
            setdropdownsq('none');
        } else {
            setdropdownsq('block');
        }

        if (securityquestiontext === '') {
            if (flag === 1) {
                setflag(0);
                setaddOrRemove('clicked');
                setaddOrRemove('backclicked');
                setdroptriangle('block');
            }
            else {
                setflag(1);
                setaddOrRemove('backclicked');
                setaddOrRemove('clicked');
                setdroptriangle('none');
            }
        }
    }




    const updateSquestion = (textContent) => {
        setupdatesq(textContent);
        setuserq(textContent);
    }


    const userintodb = async () => {
        if (!(strengthIndicators.min8char &&
            strengthIndicators.con2 &&
            strengthIndicators.con3 &&
            strengthIndicators.con4 &&
            strengthIndicators.con5
        )) {
            alert("Password is Weak !!");
        }

        else {

            try {
                const response = await fetch('/saveUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userName: username01,
                        userEmail: useremail01,
                        userPassword: userpassword01,
                        userQuestion: userquestion01,
                        userAnswer: useranswer01
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('User saved successfully!');

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
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

                        <span id="heading">SignUp</span>
                        <form id="signupform">

                            <input type="text" className="inputboxcss" id="username" placeholder="Username" name="userName"
                                onChange={updateusername} /><br />
                            <input type="text" className="inputboxcss" id="useremail" placeholder="Email Address" name="userEmail"
                                onChange={updateuseremail} /><br />


                            <input type={passwordType} className="inputboxcss" id="passworddiv" placeholder="Password" name="userPassword"
                                onFocus={showpassticks} onBlur={hidepassticks} onChange={checkstrongpass} /><br />

                            <div className="dropdown" id="showPasswordCheckbox">
                                <input type="checkbox" id="checkboxtoshowpass" onChange={togglePasswordVisibility} />Show Password
                            </div>

                            <div className="passcheckboxes" style={{ display: showstrongpass }}>

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

                            <div className={`expbox ${addOrremoveClass}`} id="makedropQ" onClick={showdropdownsq}>
                                <div className="div1">Security Question</div>
                                <span id="dropdowntriangle" style={{ display: droptriangle }}>
                                    &#9660;</span> <br />
                                <div className="div2" id="securityquestion" name="userQuestion">{securityquestiontext}</div>
                            </div>

                            <div className="passcheckboxes3" style={{ display: showsquestions }}>

                                <div className="options2" id="favpet" onClick={() => updateSquestion(document.getElementById('favpet').innerHTML)}>
                                    Pet Name</div>
                                <div className="options2" id="favbook" onClick={() => updateSquestion(document.getElementById('favbook').innerHTML)}>
                                    Favourite Book</div>
                                <div className="options2" id="favcuisine" onClick={() => updateSquestion(document.getElementById('favcuisine').innerHTML)}>
                                    Favourite Cuisine</div>
                            </div>

                            <input type="text" className="inputboxcss" id="sqans2" placeholder="Security Answer" name="userAnswer"
                                onChange={updateuserans} /><br />
                            <button type="button" id="signupbutton" onClick={userintodb}>Signup</button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SignupForm;
