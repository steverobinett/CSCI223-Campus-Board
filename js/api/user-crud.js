const fs = require("fs");
const { get } = require("http");
const DATAFILE = "testUser.json";

function add(userObj) {
  // Adds a new object to json file
  let data = [];

  if (fs.existsSync(DATAFILE)) {
    //check if file exists

    const text = fs.readFileSync(DATAFILE, "utf-8"); //read file and convert json text to array
    data = text ? JSON.parse(text) : [];
  }
  else{
    return false
  }

  data.push(userObj); // add new object to array

  fs.writeFileSync(DATAFILE, JSON.stringify(data, null, 2)); //Save updated array

  return true;
}

function getAll() {
    let data = [];

  if (fs.existsSync(DATAFILE)) {
    //check if file exists

    const text = fs.readFileSync(DATAFILE, "utf-8"); //read file and convert json text to array
    data = text ? JSON.parse(text) : [];
  }
   return data

} 

function getOne(userId){
    let allUsers = getAll()

    const user = allUsers.find(u => u.userId === userId)
    if ( !user){
        console.log(`User id ${userId} not found`);
        return null
    }
    return user
}
 function update(userObj){
    // decided to use a 'full repacement approach
    let updateObj = getOne(userObj.userId)
    if (!updateObj){
        console.log(`Update fail - invalid id`);
        return false        
    }
    else{
        const allUsers = getAll()
        // const targetUser = allUsers.find(u => u.userId === userId)
        
    }

    return true
 }
module.exports = {add, getAll, getOne, update}
