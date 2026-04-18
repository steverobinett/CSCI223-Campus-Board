// const r = require("./passwordUtils");

// r.resetPassword(1,'aaa')

const fac = require("../docs/factory");
const datastore = require("../../dataStore");

const testUser = fac.createUser({
  firstName: "Mister",
  lastName: "Test",
  password: "hashedpwd",
});

// ensure factory function works as expected
console.log(`${JSON.stringify(testUser)}`);
