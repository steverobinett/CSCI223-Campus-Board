const USR_REG = "users.json";
const bcrypt = require("bcrypt");
const fs = require("fs");
const crypto = require("crypto");
const fac = require("./factoryFunction");
const ds = require("./dataStore");


// Function to make sure passwords match by Lei B
async function checkPassword(user) {
    let password1 = user.pwd.value;
    let password2 = user.verifypwd.value;

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

async function hashPassword(pwd) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(pwd, saltRounds);
    return hashedPassword;
}

async function verifyPassword(pwd, hashedPassword) {
    const isValid = await bcrypt.compare(pwd, hashedPassword);
    return isValid;
}

async function saveUser(user) {
    try {
        let allUsers = ds.getAll(USR_REG);

        if (fs.existsSync(USR_REG)) {
            const existingUsers = fs.readFileSync(USR_REG, "utf-8");
            allUsers = JSON.parse(existingUsers);
        }

        // Duplicate email check
        const existingEmail = allUsers.find(u => u.email === user.email);
        if (existingEmail) {
            throw new Error("Email already in use!")
        };

        const hashedPwd = await hashPassword(user.pwd);
        
        const newUser = fac.createUser(user.id, user.userName, user.firstName, user.lastName, user.email, hashedPwd);
        
        ds.add(USR_REG, newUser);
    }
    catch (err) {
        console.log(`Error on Save User: ${err.message}`);
        throw err;
        }
}

module.exports = { checkPassword, hashPassword, verifyPassword, saveUser };

