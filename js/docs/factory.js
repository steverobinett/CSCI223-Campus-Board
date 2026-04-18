const { v4: uuidv4 } = require('uuid');

function createEvent({ title, description, date, location, category, createdBy }) {
  return {
    id: uuidv4(),
    title: title ?? '',
    description: description ?? '',
    date: date ?? '',
    location: location ?? '',
    category: category ?? '',
    createdBy: createdBy ?? '',
    createdAt: new Date().toISOString()
  };
}

function createUser({firstName, lastName, password}){
  return{
    userId: uuidv4(),
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    password: password ?? '',
    dateCreated: new Date().toISOString()
  };
}

module.exports ={createEvent, createUser};