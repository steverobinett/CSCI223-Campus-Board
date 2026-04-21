const fs = require("fs");
const DATAFILE = "testUser.json";

function add(userObj) {
  // Adds a new object to json file
  let status = true
  let data = [];

  if (fs.existsSync(DATAFILE)) {
    //check if file exists

    const text = fs.readFileSync(DATAFILE, "utf-8"); //read file and convert json text to array
    data = text ? JSON.parse(text) : [];
  }
  else{
    status = false
  }

  data.push(userObj); // add new object to array

  fs.writeFileSync(DATAFILE, JSON.stringify(data, null, 2)); //Save updated array

  return status;
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
    allUsers = getAll()

    user = allUsers.find(u => u.userId === userId)
    if ( !user){
        console.log(`User id ${userId} not found`);
        return null
    }
    return user
}
 function update(userObj){
    //TODO: determine which properties are updateable

    let updateObj = getOne(userObj.userId)
    if (!userObj){
        console.log(`Update fail - invlaid id`);
        return false        
    }
    else{
        //update fields
        //delete old obj
        //push new obj
    }

    return true
 }
module.exports = {add, getAll, getOne, update}
