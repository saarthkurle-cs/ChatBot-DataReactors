
let currentUser = null;

function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var loginMessage = document.getElementById('loginMessage');

    // Make a POST request to the server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    })
    .then(response => {
        if (response.ok) {
            // Redirect to index.html on successful login
            currentUser = username;
            updateNavbar();
            window.location.href = '/index.html';
        } else {
            // Display error message on invalid credentials
            return response.text();
        }
    })
    .then(message => {
        loginMessage.innerHTML = message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Send a password reset email
function sendPasswordResetEmail() {
    // Forgot password 
}

function updateNavbar() {
    const userGreeting = document.getElementById('userGreeting');
    if (currentUser) {
        userGreeting.innerHTML = `Hello, ${currentUser}`;
    } else {
        userGreeting.innerHTML = ''; // Clear the greeting if no user is logged in
    }
}

// Create a new account
function submitRegistration() {
    var newUsername = document.getElementById('newUsername').value;
    var newPassword = document.getElementById('newPassword').value;
    var createAccountMessage = document.getElementById('createAccountMessage');

    // Make a POST request to the server for registration
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUsername: newUsername, newPassword: newPassword }),
    })
    .then(response => {
        if (response.ok) {
            createAccountMessage.innerHTML = 'Account created successfully';
            // Redirect to the login page after successful registration
            window.location.href = '/login.html';
        } else {
            return response.text();
        }
    })
    .then(message => {
        createAccountMessage.innerHTML = message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Show the selected section
function showSection(sectionId) {
    // Hide all sections
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('forgotPasswordSection').style.display = 'none';
    document.getElementById('createAccountSection').style.display = 'none';
  
    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
  
    // Reset messages
    document.getElementById('loginMessage').innerHTML = '';
    document.getElementById('forgotPasswordMessage').innerHTML = '';
    document.getElementById('createAccountMessage').innerHTML = '';
  }
