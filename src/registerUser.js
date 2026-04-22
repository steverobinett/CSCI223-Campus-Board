const store = require('./dataStore');

function registerUser(username, password) {

    // Step 1: find user by username
    const user = store.getOne('users.json', 'username', username);

    // Step 2: user does not exist
    if (user === null) {
        return {
            success: false
        };
    }

    // Step 3: check password
    if (user.password === password) {
        return {
            success: true
        };
    }

    // Step 4: wrong password
    return {
        success: false
    };
}

module.exports = registerUser;