function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var loginMessage = document.getElementById('loginMessage');

    // Authentication
    
    // Go back to home page
    window.location.href = "index.html";
}

function sendPasswordResetEmail() {
    // Forgot password 
}

function submitRegistration() {
    // Create account 
}

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
