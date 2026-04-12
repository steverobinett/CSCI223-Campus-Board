const store = require('./dataStore');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

//Add user
store.add('users.json', {
    id: 1,
    username: 'scott'
});

//Add event
store.add('events.json', {
    id: 1,
    title: 'Meet up with Rebecca'
});

//Get one user
const user = store.getOne('users.json', 'username', 'scott');
console.log(user);

//Get all events
const events = store.getAll('events.json');
console.log(events);

// Serve static files
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Basic route 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static-content', 'index.html'));
});

// GET register.html - Lei B
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'static-content', 'register.html'));
});

// POST /user/registration - form submission - Lei B
app.post('/user/registration', (req, res) => {
    console.log(req.body);
    userRegistration.saveUser(req.body);
    res.redirect(__dirname, '/static-content', 'login.html')
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});