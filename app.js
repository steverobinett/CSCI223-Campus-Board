const store = require('./dataStore');

//Add user
store.add('users.json', {
    id: 1,
    username: 'scott'
});

//Add event
store.add('events.json', {
    id: 1,
    title: 'Meet up with Rebecca'
});

//Get one user
const user = store.getOne('users.json', 'username', 'scott');
console.log(user);

//Get all events
const events = store.getAll('events.json');
console.log(events);


