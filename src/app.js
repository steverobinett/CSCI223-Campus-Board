const store        = require('./dataStore');
const express      = require('express');
const path         = require('path');
const bcrypt       = require('bcrypt');

const session      = require('express-session');
require('dotenv').config();

const { saveUser } = require('./userRegistration');
const { saveEvent } = require('./events/event-crud');

const app          = express();
const PORT         = 3000;

// Path constants
const PUBLIC = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Serve static files
app.use(express.static(PUBLIC));

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC, 'index.html'));
});

app.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.send('Welcome to the dashboard! You are logged in.');
});

// Login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(PUBLIC, 'login.html'));
});

// Login form submission
app.post('/user/login', async (req, res) => {
  console.log("LOGIN BODY:", req.body);
  
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, message: 'Username and password are required.' });
  }

  const user = store.getOne({ userName: username });
  console.log("FOUND USER:", user);
  
  
  const isValid = await bcrypt.compare(password, user.userPassword);

  if (!user || !isValid) {
    return res.json({ success: false, message: 'Invalid username or password.' });
  }

  // Creates a session for the user
  req.session.userId = user.id || user._id;
  
  console.log("LOGIN SUCCESS");
  

  res.json({ success: true, message: 'Login successful.' });
});

// logout route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('Logged out successfully.');
  });
});

// Register page
app.get('/register', (req, res) => {
  res.sendFile(path.join(PUBLIC, 'register.html'));
});

// POST /user/registration - form submission - Lei B
app.post('/user/registration', async (req, res) => {
  try {
    if (req.body.pwd !== req.body.verifypwd) {
      return res.status(400).send('Passwords do not match.');
    }
    await saveUser(req.body);
    res.redirect('/');
  } catch (err) {
    if (err.message === 'Email already in use!') {
      return res.status(400).send('Email is already registered.');
    }
    res.status(500).send('Error saving user.');
  }
});

// Create new event page
app.get('/event/create', (req, res) => {
  res.sendFile(path.join(PUBLIC, 'createNew.html'));
});

// POST /event/create - form submission
app.post('/event/create', (req, res) => {
  if (!req.body.title || !req.body.date || !req.body.time) {
    return res.json({ success: false, message: 'Title, date and time are required.' });
  }
  const event = saveEvent(req.body);
  res.json({ success: true, message: 'Event created.', event });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});