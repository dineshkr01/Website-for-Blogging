import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import HomePageLinks from './components/HomePageLinks.jsx';
import BlogContainer from './components/BlogContainer.jsx';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';


function App() {
  const [blogContainers, setBlogContainers] = useState([]);
  const [overlaydisplay, setoverlaydisplay] = useState('');
  const [modaltop, setmodaltop] = useState('');
  const [loginvis, setloginvis] = useState('visible');
  const [flag, setFlag] = useState(true);
  const [overlaydisplay2, setoverlaydisplay2] = useState('');
  const [modaltop2, setmodaltop2] = useState('');
  const [username01, setUsername] = useState('@Buso2024');
  const [userpassword01, setUserpass] = useState('');





  const handleLinkClick = () => {
    const newContainer = (
      <BlogContainer
        key={blogContainers.length}
        postid={blogContainers.length + 1}
        postusername={localStorage.getItem('UserName')}
        postbtn={true}
        canRead={false}
        autofocus={true}
        saveOrEdit={"none"}
      />
    );
    setBlogContainers(prevContainers => [...prevContainers, newContainer]);
  };

  const handleLoginButton = () => {
    setoverlaydisplay('none');
    setmodaltop('-100%');
  }

  const handleLoginClick = () => {
    console.log("I am Login Button !!!!....");
    setoverlaydisplay('block');
    setmodaltop('1%');
  }

  const handleSignupClick = () => {
    setoverlaydisplay2('block');
    setmodaltop2('1%');
  }

  const handleSignupClose = () => {
    setoverlaydisplay2('none');
    setmodaltop2('-100%');
  }

  const updateUsername = (event) => {
    setUsername(event.target.value);
    console.log(event.target.value);
  }

  const updateUserpass = (event) => {
    setUserpass(event.target.value);
    console.log(event.target.value);
  }

  const loginUser = async () => {
    try {
      const response = await fetch('http://localhost:8087/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: username01,
          userPassword: userpassword01,
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const USER = await response.json();
      localStorage.setItem("UserName" , USER.userName);
      localStorage.setItem("UserEmail" , USER.userEmail);
      localStorage.setItem("UserID" , USER.id);
      console.log('User saved successfully!');
      setloginvis('hidden');

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  const getallposts = async () => {
    console.log("####" + flag);
    console.log("I am getallposts function !!!");
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

      const newBlogContainers = posts.map(post => (
        <BlogContainer
          key={post.id}
          postid={post.id}
          postusername={post.username}
          userpost={post.userpost}
          postbtn={false}
          canRead={true}
          autofocus={false}
          saveOrEdit={'none'}
        />
      ));
      setBlogContainers(newBlogContainers);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  console.log("Component rendered.");
  useEffect(() => {
    if (flag) {
      setFlag(false);
      getallposts();
    }
  }, [flag]);



  const showeUserProfile = () => {

  }

  return (
    <>
      <SignupForm handleSignupClose={handleSignupClose} changesignupdisplay={overlaydisplay2} changesignuptop={modaltop2} />
      <LoginForm
        handleLoginButtonClick={handleLoginButton}
        changedisplay={overlaydisplay}
        changetop={modaltop}
        loginUser={loginUser}
        updateusername={updateUsername}
        updateuserpass={updateUserpass}
      />
      <HomePageLinks handleLinkClick={handleLinkClick} handleLoginClick={handleLoginClick} handleSignupClick={handleSignupClick}
        visibility={loginvis} showeUserProfile={showeUserProfile} />
      {blogContainers}
    </>
  );
}

export default App;
