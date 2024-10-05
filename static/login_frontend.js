// This file is intended to support front end login functionality and should interact with the login_backend.py file
// It should be the first page the user sees when they visit the website

// On page load
window.onload = function () {
    setupLoginPage();
};

function setupLoginPage() {
    const container = document.getElementById('app');

    const loginForm = document.createElement('form');
    loginForm.setAttribute('id', 'loginForm');
    
    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = "Username:";
    const usernameInput = document.createElement('input');
    usernameInput.setAttribute('type', 'text');
    usernameInput.setAttribute('id', 'username');
    usernameInput.setAttribute('required', true);
    
    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = "Password:";
    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('id', 'password');
    passwordInput.setAttribute('required', true);

    const loginButton = document.createElement('button');
    loginButton.textContent = "Login";
    loginButton.addEventListener('click', function (event) {
        event.preventDefault();
        loginUser();
    });

    const registerButton = document.createElement('button');
    registerButton.textContent = "Register";
    registerButton.addEventListener('click', function (event) {
        event.preventDefault();
        registerUser();
    });

    loginForm.appendChild(usernameLabel);
    loginForm.appendChild(usernameInput);
    loginForm.appendChild(passwordLabel);
    loginForm.appendChild(passwordInput);
    loginForm.appendChild(loginButton);
    loginForm.appendChild(registerButton);
    
    container.appendChild(loginForm);
}

function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Login successful!");
        } else {
            alert("Login failed: " + data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Registration successful!");
        } else {
            alert("Registration failed: " + data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
