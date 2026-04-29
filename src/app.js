const store        = require('./dataStore');
const express      = require('express');
const path         = require('path');
const { saveUser } = require('./userRegistration');
const app          = express();
const PORT         = 3000;


// Path constants
const PUBLIC = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(PUBLIC));

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC, 'index.html'));
});

// Login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(PUBLIC, 'login.html'));
});

// Login Routing
app.post('/user/login', async (req, res) => {
  try {
    const { username, pwd } = req.body;
    const allUsers = store.getAll('users');

    // Find entered user name.
    const user = allUsers.find(u => u.username === username);

    if (!user) {
      return res.status(400).send('No account found with that username.');
    };

    const isValid = await saveUser.verifyPwd(pwd, user.hashedPwd);
     if (!isValid) {
      return res.status(400).send('Incorrect password')
     }

     res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error logging in.');
  }
})


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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});