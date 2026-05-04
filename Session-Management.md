# Feature 71 - Research Session Management

## Overview
To implement session management in our Node.js application, we will use middleware to maintain user login state across requests. This allows authenticated users to access protected routes without needing to re-login on each request.

---

## Recommended Package

### express-session
- Handles session creation and management in Express applications 
- Stores session data on the server
- Provides a session ID stored in a browser cookie

---

## Configuration Requirements

A `SESSION_SECRET` environment variable must be added to `.env`:

```
SESSION_SECRET=your-secret-key-here
```

This secret signs the session cookie so it cannot be tampered with. It should **never** be committed to version control.

---

## How It Will Be Used

When a user logs in successfully, a session will be created and stored.

- The `userId` will be saved in the session object
- Routes will check for session existence to allow or deny access

---

## Example: Middleware Setup (app.js)

```js
const session = require('express-session');

app.use(session( {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
```

## Example: Setting a Session

```js
req.session.userId = user.id;
```

## Example: Protecting Routes

```js
if (!req.session.userId) {
    return res.redirect("/login");
}
```