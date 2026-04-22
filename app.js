const store = require('./dataStore');
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

// Serve static files
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static-content', 'index.html'));
});

// Login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'static-content', 'login.html'));
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});