let token = "null";
document.addEventListener('DOMContentLoaded', function () {

    const loginbutton = document.getElementById('loginbtn');
    loginbutton.addEventListener('click', function () {
        generatetoken();
    });
    console.log("I am login Page");
    function generatetoken() {

        let username = document.getElementById('exampleFormControlInput1').value;
        let userpassword = document.getElementById('password').value;



        fetch('/loginviausername', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName: username })
        })
            .then(response => {
                console.log('Response status:', response.status);
                return response.json(); 
            })
            .then(data => {
                console.log(data);
                if (data !== null && username === data.userName && userpassword === data.userPassword) {
                    fetch('/generatetoken', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userName: username })
                    })
                        .then(response => {
                            console.log('Response status: ', response.status);
                            return response.text();
                        })
                        .then(data => {
                            token = data;
                            localStorage.setItem("tokendata", token);
                            localStorage.setItem("hide", "true");
                            console.log('Token:', token);
                            window.location.replace("/loggeduserPage");
                        })
                        .catch(error => {
                            console.error('Login failed:', error);
                        });
                } else {
                    document.getElementById("alertbtn").click();
                }
            })
            .catch(error => {
                console.error("Login failed invalid credentials !!!", error);
            });



    }
});




