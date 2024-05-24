import React, { useState } from 'react';
import './BlogContainer.css';

const BlogContainer = ({ postid, postusername, userpost, postbtn, canRead,
  autofocus, saveOrEdit , Deletepost
}) => {

  const [hidepost, sethidepost] = useState(true);
  const [canRead2, setcanRead2] = useState(true);
  const [currentPost, setCurrentPost] = useState(userpost);
  const [saveOrEditText, setSaveOrEditText] = useState('Edit');

  const publishpost = async () => {
    sethidepost(false);
    setcanRead2(true);
    try {
      const response = await fetch('http://localhost:8087/postblog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userpost: currentPost,
          username: postusername,
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Post saved successfully!');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  const updatetext = (event) => {
    setCurrentPost(event.target.value);
  }

  const updatePostFun = async () => {
    console.log("This is postid of edited blog : " + postid);
    if (saveOrEditText === "Edit") {
      setSaveOrEditText("Save");
      setcanRead2(false);
    } else {
      setcanRead2(true);
      setSaveOrEditText("Edit");
      try {
        const response = await fetch(`http://localhost:8087/users/${postid}/updatedPost`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userpost: currentPost })
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Failed to update POST###:', error.message);
      }
    }
  }


   

  return (
    <div id="blogContainer">
      <div className="inputTextFormclass" key={postid}>
        <div className="alldivcontainer">
          <div className="usernamediv203">@{postusername}</div>
          <textarea className="auto-expanding-textarea" placeholder="Type here..." value={currentPost}
            onChange={updatetext}
            readOnly={canRead2} autoFocus={autofocus}
          />
          <div className="publishdiv203">
            <button
              type="button"
              className="publishbtn203"
              onClick={publishpost}
              style={{ visibility: hidepost && postbtn ? 'visible' : 'hidden' }}
            >
              post
            </button>




            <button
              type="button"
              onClick={Deletepost}
              className='publishbtn203'
            >
              Delete Post
            </button>


            <button
              type="button"
              onClick={updatePostFun}
              className='publishbtn203'
              style={{ display: saveOrEdit }}
            >
              {saveOrEditText}
            </button>



          </div>
        </div>
      </div>
    </div >
  );
};

export default BlogContainer;
