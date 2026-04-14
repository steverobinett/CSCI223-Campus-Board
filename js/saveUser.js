// Save New User Registration
function saveUser(form) {
    try {
        let allUsers = [];
        let nextId = self.crypto.randomUUID();
        if (fs.existsSync(USR_REG)) {
            const existingUsers = fs.readFileSync(USR_REG, "utf-8");
            allUsers = JSON.parse(existingUsers);
        }
        const newUser = {
            id: nextId,
            userName: user.userName,
            userEmail: user.email,
            userPassword: user.pwd(hashPassword())
        }
        allUsers.push(newUser);
        fs.writeFileSync(USR_REG, JSON.stringify(allUsers, null, 2), "utf-8");
    }
    catch (err) {
        console.log(`Error on Save User data ${err.message}`);
        
    }
}

module.exports = { saveUser };