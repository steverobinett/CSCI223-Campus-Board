const { v4: uuidv4 } = require('uuid');

function createEvent(title, location, date, description, category, createdBy) {
  return {
    id:          uuidv4(),
    title:       title       ?? '',
    location:    location    ?? '',
    date:        date        ?? '',
    description: description ?? '',
    category:    category    ?? '',
    createdBy:   createdBy   ?? '',
    createdAt:   new Date().toISOString(),
    // Methods
    getSummary() {
      return `${this.title} at ${this.location} on ${this.date}.`;
    },
    isUpcoming() {
      return new Date(this.date) > new Date();
    }
  };
}

function createUser(userName, firstName, lastName, email, password) {
  return {
    userId:      uuidv4(),
    userName:    userName  ?? '',
    firstName:   firstName ?? '',
    lastName:    lastName  ?? '',
    email:       email     ?? '',
    password: password ?? '',
    dateCreated: new Date().toISOString(),
    getSummary() {
      return `${this.userName} is ${this.firstName} ${this.lastName} and can be contacted at ${this.email}.`;
    }
  };
}

// Usage
const event1 = createEvent("Comic Con 2026", "San Diego, CA", "2026-07-23");
const event2 = createEvent("Wellermen Concert", "Dublin, Ireland", "2026-07-10");
console.log(event1.getSummary());
// Expected "Comic Con 2026 at San Diego, CA on 2026-07-23."
console.log(event2.isUpcoming());
// Expected true

const user1 = createUser("Elekia", "LeiHala", "Booth", "leihala.hand@gmail.com", "password123");
console.log(user1.getSummary());
// Expected "Elekia is LeiHala Booth and can be contacted at leihala.hand@gmail.com"

module.exports = { createEvent, createUser };