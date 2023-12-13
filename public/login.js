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

// Create a new account
function submitRegistration() {
    // Create account 
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
