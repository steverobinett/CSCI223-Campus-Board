const USR_REG = "users.json";
const bcrypt = require("bcrypt");
const fs = require("fs");
const crypto = require("crypto");


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
        let allUsers = [];

        if (fs.existsSync(USR_REG)) {
            const existingUsers = fs.readFileSync(USR_REG, "utf-8");
            allUsers = JSON.parse(existingUsers);
        }

        // Duplicate email check
        const existingEmail = allUsers.find(u => u.userEmail === user.email);
        if (existingEmail) {
            throw new Error("Email already in use!")
        };

        const hashedPwd = await hashPassword(user.pwd);

        const newUser = {
            id: crypto.randomUUID(),
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            userEmail: user.email,
            userPassword: hashedPwd
        };
        
        allUsers.push(newUser);

        fs.writeFileSync(USR_REG, JSON.stringify(allUsers, null, 2), "utf-8");
    }
    catch (err) {
        console.log(`Error on Save User: ${err.message}`);
        throw err;
        }
}

module.exports = { checkPassword, hashPassword, verifyPassword, saveUser };

