import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import BlogContainer from './BlogContainer';
import EditDropDown from './EditDropDown.jsx';

const UserProfile = () => {
    const storedUserName = localStorage.getItem("UserName");
    const [storedUserEmail, setUpdateEmail] = useState(localStorage.getItem("UserEmail"));
    const [EmailOutline, setEmailOutline] = useState('rgba(0,0,0,0)');
    const [blogContainers, setBlogContainers] = useState([]);
    const [editMailHTML, setEditMailHTML] = useState('Edit');
    const [readOnly, setReadOnly] = useState(true);
    const [overlayDisplay, setOverlayDisplay] = useState(false);
    const [modalTop, setModalTop] = useState(false);
    const [DBUSER, setDBUSER] = useState('Hello World !!');


    useEffect(() => {
        const getAllUserPosts = async () => {
            try {
                const response = await fetch('http://localhost:8087/getallposts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const posts = await response.json();
                const newBlogContainers = posts
                    .filter(post => post.username === storedUserName)
                    .map(post => (
                        <BlogContainer
                            key={post.id}
                            postid={post.id}
                            postusername={post.username}
                            userpost={post.userpost}
                            postbtn={false}
                            canRead={readOnly}
                            autofocus={false}
                            saveOrEdit={'block'}
                            Deletepost={() => removeBlogContainer(post.id)}
                        />
                    ));
                setBlogContainers(newBlogContainers);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getAllUserPosts();
    }, [storedUserName, readOnly]);



    const handleSignupClose = () => {
        setOverlayDisplay('none');
        setModalTop('-100%');
    }

    const editMail = async () => {
        if (editMailHTML === 'Edit') {
            setOverlayDisplay('block');
            setModalTop('1%');
        } else {
            try {
                const response = await fetch(`http://localhost:8087/users/${storedUserName}/email`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userEmail: storedUserEmail })
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(errorMessage);
                }
                setDBUSER(await response.json().userPassword);
            } catch (error) {
                console.error('Failed to update email:', error.message);
            }
        }
    }

    const handleEditMail = (event) => {
        setUpdateEmail(event.target.value);
    }

    const changePassword = () => {
        setOverlayDisplay('block');
        setModalTop('1%');
    }




    const removeBlogContainer = async (postid) => { // Receive postid directly
        console.log(postid);
        setBlogContainers(prevContainers => {
            return prevContainers.filter(container => container.props.postid !== postid);
        });

        try {
            const response = await fetch(`http://localhost:8087/users/${postid}/deletePost`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Failed to update POST###:', error.message);
        }
    }



    return (
        <>
            <EditDropDown
                handleSignupClose={handleSignupClose}
                changesignupdisplay={overlayDisplay}
                changesignuptop={modalTop}
                DBUSER={DBUSER}
                updatePASSWORD2={handleSignupClose}
            />
            <div className='upperButtonsBox'>
                <button className='userButtons' id='changePassword' onClick={changePassword}>Change Password</button>
            </div>
            <div className='upperButtonsBox'>
                <button className='userButtons' id='changePassword' onClick={editMail}>Change Email</button>
            </div>

            <div className='lowerContainer'>
                <div className='userName'>@{storedUserName}</div>
            </div>

            <div className='userEmail'>
                <span>Email: </span>
                <span style={{fontSize: '1.5rem'}}>{storedUserEmail}
                </span>
            </div>

            {blogContainers}
        </>
    );
};

export default UserProfile;
