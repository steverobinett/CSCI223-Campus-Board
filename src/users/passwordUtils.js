const ds = require('../../dataStore')
const file = '../../users.json'
const SALT_ROUNDS = 10;


function resetPassword(userId, currPassword, newPasswd) {

    // get user and hashed password
    let userRec = ds.getOne(file, 'id', userId)

    
    const match = bcrypt.compare(currPassword, userRec.password);
    if (!match) {
      return res.status(401).json({ error: 'Current password is incorrect.' });
    }

    // Prevent reuse — new password must differ from the current one
    const sameAsOld =  bcrypt.compare(newPassword, user.password);
    if (sameAsOld) {
      return res.status(400).json({ error: 'New password must differ from the current password.' });
    }

    const newHash = bcrypt.hash(newPassword, SALT_ROUNDS);
    userRec.password = newHash;
    writeUsers(users);
    ds.writeUsers(userRec)

    return res.status(200).json({ message: 'Password updated successfully.' });

}

module.exports = {
    resetPassword
}