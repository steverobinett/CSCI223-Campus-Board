const store = require('./dataStore');
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const registerUser = require('./registerUser');

console.log(registerUser('scott', '1234'));
console.log(registerUser('scott', 'wrong'));
console.log(registerUser('fake', '1234'));

// Add user
// store.add('users.json', {
    // id: 1,
    // username: 'scott'
// });
// 
// Add event
// store.add('events.json', {
    // id: 1,
    // title: 'Meet up with Rebecca'
// });

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