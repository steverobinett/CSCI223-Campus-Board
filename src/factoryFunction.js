/* Factory Functions - Event - LeiHala B*/

function createEvent(title, location, date) {
    return {
        id:Date.now().toString(),
        title,
        location,
        date,
        createdAt: new Date().toString,
    

    // Methods 
        getSummary() {
            return `${this.title} at ${this.location} on ${this.date}.`;
        },

        isUpcoming() {
            return new Date(this.date) > new Date();
        }
   } 
};

// Usage
const event1 = createEvent("Comic Con 2026", "San Diego, CA", "2026-07-23");
const event2 = createEvent("Wellermen Concert", "Dublin, Ireland", "2026-07-10")

console.log(event1.getSummary());
// Expected "Comic Con 2026 at San Diego, CA on 07/23/2026."
console.log(event2.isUpcoming());
// Expected true

function createUser(userName, firstName, lastName, email) {
    return {
        userName,
        firstName,
        lastName,
        email,
    
    getSummary() {
        return `${userName} is ${firstName} ${lastName} and can be contacted at ${email}.`
    }
  }
}

// Usage
const user1 = createUser("Elekia", "LeiHala", "Booth", "leihala.hand@gmail.com")

console.log(user1.getSummary());
// Expected "Elekia is LeiHala Booth and can be contacted at leihala.hand@gmail.com"

