const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('togglePassword');

togglePasswordButton.addEventListener('mousedown', function () {
    passwordInput.setAttribute('type', 'text');
});

togglePasswordButton.addEventListener('mouseup', function () {
    passwordInput.setAttribute('type', 'password');
});

togglePasswordButton.addEventListener('mouseleave', function () {
    passwordInput.setAttribute('type', 'password');
});