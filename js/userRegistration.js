const path = require("path");
const USR_REG = "users.json";
const fs = require("fs");

// Function to make sure passwords match by Lei B
function checkPassword(form) {
    password1 = form.pwd.value;
    password2 = form.verifypwd.value;

    // No password input
    if (password1 == '')
        alert("Please enter a Password")

    else if (password2 == '')
        alert("Please confirm Password")

    // If passwords don't match
    else if (password1 != password2) {
        alert("\nPasswords do not match, please try again.")
        return false;
    }

    // Continue if passwords match
    else {
        return true;
    }
}       
    
// Encrypt the password?

const bcrypt = require("bcrypt");

async function hashPassword(pwd) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(pwd, saltRounds);
    return hashedPassword;
}

async function verifyPassword(pwd, hashedPassword) {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
}

module.exports = { checkPassword, hashPassword, verifyPassword }

