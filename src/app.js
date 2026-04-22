const store        = require('./dataStore');
const express      = require('express');
const path         = require('path');
const { saveUser } = require('./js/userRegistration');
const app          = express();
const PORT         = 3000;

// Path constants
const STATIC = path.join(__dirname, 'static-content');
const CSS    = path.join(__dirname, 'css');
const JS     = path.join(__dirname, 'js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/css', express.static(CSS));
app.use('/js', express.static(JS));

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(STATIC, 'index.html'));
});

// Login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(STATIC, 'login.html'));
});

// Login form submission
app.post('/user/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, message: 'Username and password are required.' });
  }

  const user = store.getOne('users.json', 'username', username);

  if (!user || user.passwordHash !== password) {
    return res.json({ success: false, message: 'Invalid username or password.' });
  }

  res.json({ success: true, message: 'Logged in.' });
});

// Register page
app.get('/register', (req, res) => {
  res.sendFile(path.join(STATIC, 'register.html'));
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});