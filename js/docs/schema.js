// schema.js
const SCHEMAS = {
  event: {
    id: '',          // string (UUID)
    title: '',       // string, required
    description: '', // string
    date: '',        // ISO 8601 string: "2026-04-15T18:00:00"
    location: '',    // string
    createdBy: '',   // string (user id)
    createdAt: '',   // ISO 8601 string
  }
  ,
  user:{
    userId: '',     // string (UUID)
    firstName: '',  // string
    lastName: '',   // string
    password: '',   //string - hashed
    dateCreated:''  // ISO 8601 string: "2026-04-15T18:00:00"
  }
};

module.exports = SCHEMAS;