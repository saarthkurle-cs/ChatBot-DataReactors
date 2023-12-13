var message = 'CSC-317 startup template\n'
         + 'This template uses nodeJS, express, and express.static\n';

var port = 3000;
var path = require('path');
var express = require('express');
var app = express();
const fs = require('fs');
const mysql = require('mysql2'); // Change the import to mysql2

var StaticDirectory = path.join(__dirname, 'public');

app.use(express.static(StaticDirectory));
app.use(express.json()); // Add this line to parse JSON requests

// Set up MySQL connection
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'datareactors'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL');
});

// Set up a route for handling login requests
app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    console.log('Received login request:', { username, password }); // Add this line

    // Query to check username and password in the users table
    var sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

    db.query(sql, [username, password], (err, result) => {
        if (err) {
            throw err;
        }

        if (result.length > 0) {
            // Successful login
            res.send('Login successful');
        } else {
            // Invalid credentials
            res.status(401).send('Invalid username or password');
        }
    });
});

// Set up a route for handling register requests
app.post('/register', (req, res) => {
    var newUsername = req.body.newUsername;
    var newPassword = req.body.newPassword;

    console.log('Received register request:', { newUsername, newPassword }); 

    // Query to insert a new user into the users table
    var sql = 'INSERT INTO users (username, password) VALUES (?, ?)';

    db.query(sql, [newUsername, newPassword], (err, result) => {
        if (err) {
            // Check for duplicate entry error
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).send('Username already exists');
            } else {
                throw err;
            }
        } else {
            // Registration successful
            res.send('Registration successful');
        }
    });
});


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});

console.log(message);


