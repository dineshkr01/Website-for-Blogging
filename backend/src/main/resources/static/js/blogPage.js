// import { token } from './loginPage.js';
// console.log(token); // Output: Hello, world!
let counter = 0;
let addCardBtn = document.getElementById('addCardBtn');
let token = localStorage.getItem('tokendata');
let usernameforall = "null";
const profilebtn = document.getElementById('profilebtn');
const loginalert = document.getElementById('loginalert');

document.addEventListener('DOMContentLoaded', function () {

    fetch('/getallposts') // Use GET method
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {





                let newForm = document.createElement('form');
                newForm.className = 'inputTextFormclass';
                // newForm.id = 'inputTextForm' + counter;
                newForm.innerHTML = `
                        <div class="card border-success mb-3" style="max-width: 60rem;">
                            <div class="card-header bg-transparent border-success" name="username3333" >random</div>
                            <div>
                                <input type="text" class="form-control hidepublishbtn" placeholder="Write Your Blog Here" name="postcontent">
                            </div>
                            <div class="card-footer bg-transparent border-success">
                                <button type="submit" class="btn btn-primary">publish</button>
                            </div>
                        </div>`;

                let blogContainer = document.getElementById('blogContainer');
                blogContainer.appendChild(newForm);
                newForm.querySelector('[name="postcontent"]').value = post.userpost;
                newForm.querySelector('[name="username3333"]').textContent = post.username;
                newForm.querySelector('.btn-primary').style.display = 'none';
                newForm.querySelector('[name="postcontent"]').disabled = true;





            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });









    fetch('/loginUserviaToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
    })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            usernameforall = data.userName;
            if (token) {

                profilebtn.innerText = usernameforall;
            }
            else {
                profilebtn.style.display = "none";
            }
        })

        .catch(error => {
            console.error('Login failed:', error);
        });
});


console.log("Your token is : " + token);
addCardBtn.addEventListener('click', function () {
    if (token) {
       
        generateNewForm();

    }
    else {
        document.getElementById("alertbtn").click();
    }
});

function generateNewForm() {
    let newForm = document.createElement('form');
    newForm.className = 'inputTextFormclass';
    // newForm.id = 'inputTextForm' + counter;
    newForm.innerHTML = `
            <div class="card border-success mb-3" style="max-width: 60rem;">
                <div class="card-header bg-transparent border-success" name="username3333" >random</div>
                <div>
                    <input type="text" class="form-control hidepublishbtn" placeholder="Write Your Blog Here" name="postcontent">
                </div>
                <div class="card-footer bg-transparent border-success">
                    <button type="submit" class="btn btn-primary">publish</button>
                </div>
            </div>`;





    const username3333 = newForm.querySelector('[name="username3333"]');
    username3333.textContent = usernameforall;
    let blogContainer = document.getElementById('blogContainer');
    blogContainer.appendChild(newForm);

    newForm.addEventListener("submit", function (event) {
        console.log("Form submitted.");
        event.preventDefault();
        newForm.querySelector('.btn-primary').style.display = 'none';
        let userpost = newForm.querySelector('[name="postcontent"]').value;
        let username = newForm.querySelector('[name="username3333"]').textContent;
        console.log("form user is : " + username);
        fetch('/postblog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userpost: userpost, username: username })
        })
    });

    counter++;
}

loginbtn.addEventListener('click', function () {
    window.location.href = "/loginPage";
});


