const dataStore = require("./dataStore");
const bcrypt = require("bcrypt");

  
// Encrypt the password?
async function hashPassword(pwd) {
    return await bcrypt.hash(pwd, 12);
}

async function verifyPassword(pwd, hashedPassword) {
    return await bcrypt.compare(pwd, hashedPassword);
}

async function createUser(body) {
    const hashedPwd = await hashPassword(body.pwd);

    return {
        userId: "",
        username: body.userName,
        firstName: body.firstName,
        lastName: body.lastName,
        userEmail: body.email,
        password: hashedPwd
    };
}
async function registerUser(body) {
    const userObject = await createUser(body);

    const existingUser = dataStore.getOne(userObject);

    if (existingUser) {
        throw new Error("Email already in use!");
    }

    dataStore.add(userObject);

    return userObject;
}
module.exports = {  hashPassword, verifyPassword, createUser, registerUser };

