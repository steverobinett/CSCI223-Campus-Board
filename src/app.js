const store = require('./dataStore');
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const { saveUser } = require('./js/userRegistration');

const registerUser = require('./registerUser');

console.log(registerUser('scott', '1234'));
console.log(registerUser('scott', 'wrong'));
console.log(registerUser('fake', '1234'));


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