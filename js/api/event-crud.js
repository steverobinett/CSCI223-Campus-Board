const fs       = require('fs');
const { createEvent } = require('../docs/factory');

const DATAFILE = 'events.json';

// Add a new event object
function add(eventObj) {
  let data = [];
  if (fs.existsSync(DATAFILE)) {
    const text = fs.readFileSync(DATAFILE, 'utf-8');
    data = text ? JSON.parse(text) : [];
  }
  data.push(eventObj);
  fs.writeFileSync(DATAFILE, JSON.stringify(data, null, 2));
  return eventObj;
}

// Get all events
function getAll() {
  if (!fs.existsSync(DATAFILE)) return [];
  const text = fs.readFileSync(DATAFILE, 'utf-8');
  return text ? JSON.parse(text) : [];
}

// Get one event by id
function getOne(eventId) {
  const allEvents = getAll();
  const event = allEvents.find(e => e.id === eventId);
  if (!event) {
    console.log(`Event id ${eventId} not found`);
    return null;
  }
  return event;
}

// Create and save a new event from raw form data
function saveEvent(formData) {
  const event = createEvent({
    title:       formData.title,
    description: formData.description,
    date:        formData.date && formData.time ? `${formData.date}T${formData.time}` : formData.date,
    location:    formData.location,
    createdBy:   formData.createdBy ?? '',
  });
  return add(event);
}

module.exports = { add, getAll, getOne, saveEvent };