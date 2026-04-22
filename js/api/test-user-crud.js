const ds = require('./user-crud')
const fac = require("../docs/factory");

//Test: add
const testUser = fac.createUser({
  firstName: "Another",
  lastName: "Test User",
  password: "hashedpwd",
});
ds.add(testUser)

//Test: getAll
const allUsers = ds.getAll()
console.log(`${allUsers}`);
console.log(`${JSON.stringify(allUsers)}`);
allUsers.forEach(element => {
    console.log(JSON.stringify(element,null,2));
    
});
console.log(`There are a total of ${allUsers.length}`);

//Test: getone
const userId = "dc242461-b94a-4d96-98f2-b6b9a92e9df0"
const theUser = ds.getOne(userId)
console.log(`User is ${JSON.stringify(theUser)}`);

//Test: update
const updatedUser = { ...theUser, firstName: "Updated", lastName: "Name" };
const updateResult = ds.update(updatedUser);
console.log(`Update result: ${updateResult}`);
const afterUpdate = ds.getOne(userId);
console.log(`After update: ${JSON.stringify(afterUpdate)}`);

// Test: update with invalid userId
const badUpdate = ds.update({ userId: "nonexistent-id", firstName: "Ghost" });
console.log(`Update with bad id: ${badUpdate}`);

