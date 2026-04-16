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