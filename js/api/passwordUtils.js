const ds = require('../../dataStore')
const file = '../../users.json'

function resetPassword(userName, passwd) {

    // get user and hashed password
    let userRec = ds.getOne(file, 'id', userName)

    console.log(`return is: ${JSON.stringify(userRec)}`);
    
}

module.exports = {
    resetPassword
}