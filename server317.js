var message = 'CSC-317 startup template\n'
         + 'This template uses nodeJS, express, and express.static\n';

var port = 3000;
var path = require('path');
var express = require('express');
var app = express();
const fs = require('fs');
const mysql = require('mysql2'); // Change the import to mysql2
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var StaticDirectory = path.join(__dirname, 'public');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

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
    const username = req.body.username;
    const password = req.body.password;

    console.log('Received login request:', { username, password });

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(sql, [username, password], (err, result) => {
        if (err) {
            throw err;
        }

        if (result.length > 0) {
            // Set the userid in a cookie upon successful login
            const userId = result[0].userid;

            // Set a cookie named 'userId' with the user's ID
            res.cookie('userid', userId);

            res.send('Login successful');
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
});

// Set up a route for handling register requests
app.post('/register', (req, res) => {
    const newUsername = req.body.newUsername;
    const newPassword = req.body.newPassword;

    console.log('Received register request:', { newUsername, newPassword });

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';

    db.query(sql, [newUsername, newPassword], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).send('Username already exists');
            } else {
                throw err;
            }
        } else {
            res.send('Registration successful');
        }
    });
});

// Set up a route for handling buy now requests
app.post('/addtoCart', (req, res) => {
    const userId = req.cookies.userid;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'User not logged in' });
    }

    const productId = req.body.productId;
    console.log('Received addToCart request for product ID:', { productId })

    // Modify the SQL query to insert the product ID into the cart
    const sql = 'INSERT INTO cart (userid, productid) VALUES (?, ?)';
    db.query(sql, [userId, productId], (err, result) => {
        if (err) {
            throw err;
        }

        res.json({ success: true, message: 'Item added to cart' });
    });
});

app.post('/updatePassword', (req, res) => {
    const userId = req.cookies.userid;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'User not logged in' });
    }

    const newPassword = req.body.newPassword;
    const confirmPassord = req.body.confirmPassord;

    // Update password in the database
    const sql = 'UPDATE users SET password = ? WHERE userid = ?';
    db.query(sql, [newPassword, userId], (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ success: true, message: 'Password updated successfully' });
    });
});

// Set up a route for handling update address requests
app.post('/updateAddress', (req, res) => {
    const userId = req.cookies.userid;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'User not logged in' });
    }

    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zipcode = req.body.zipcode;

    // Update address in the database
    const sql = 'UPDATE users SET street_address = ?, city = ?, state = ?, zip_code = ? WHERE userid = ?';
    db.query(sql, [street, city, state, zipcode, userId], (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ success: true, message: 'Address updated successfully' });
    });
});

app.get('/getUserAddress', (req, res) => {
    const userId = req.cookies.userid;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'User not logged in' });
    }

    // Query to retrieve user's address
    const sql = 'SELECT street_address, city, state, zip_code FROM users WHERE userid = ?';

    db.query(sql, [userId], (err, result) => {
        if (err) {
            throw err;
        }

        if (result.length > 0) {
            const userAddress = {
                street: result[0].street_address,
                city: result[0].city,
                state: result[0].state,
                zipcode: result[0].zip_code
            };

            res.json({ success: true, address: userAddress });
        } else {
            res.json({ success: false, message: 'User not found' });
        }
    });
});

app.get('/getCartItems', (req, res) => {
    const userId = req.cookies.userid;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'User not logged in' });
    }

    // Query to retrieve cart items for the user
    const sql = 'SELECT c.id, c.productid, i.name, i.price FROM cart c JOIN inventory i ON c.productid = i.id WHERE c.userid = ?';

    db.query(sql, [userId], (err, result) => {
        if (err) {
            throw err;
        }

        const cartItems = result.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            productid: item.productid,
        }));
        res.json({ success: true, cartItems });
    });
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});

console.log(message);
