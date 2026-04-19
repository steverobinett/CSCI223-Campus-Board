const store = require('./dataStore');
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
const { saveUser } = require('./js/userRegistration');


// //Add user
// store.add('users.json', {
//     id: 1,
//     username: 'scott'
// });

// //Add event
// store.add('events.json', {
//     id: 1,
//     title: 'Meet up with Rebecca'
// });

//Get one user
const user = store.getOne('users.json', 'username', 'scott');
console.log(user);

//Get all events
const events = store.getAll('events.json');
console.log(events);

// Serve static files
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use(express.urlencoded({ extended: true }));

// Basic route 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static-content', 'index.html'));
});

// GET register.html - Lei B
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'static-content', 'register.html'));
});

// POST /user/registration - form submission - Lei B
app.post('/user/registration', async (req, res) => {
    try {
        console.log('POST /user/registration hit');
        console.log(req.body);

        // validate passwords
        if (req.body.pwd !== req.body.verifypwd) {
            return res.status(400).send("Passwords do not match.");
        }
        await saveUser(req.body);
        res.redirect('/');       
        } catch (err) {
            if (err.message === "Email already in use!") {
                return res.status(400).send("Email is already registered!")
            }
        console.log(err);
        res.status(500).send("Error saving user");
    }
    
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});