const fs = require("fs");

const DATAFILE = "events.json";

function add(eventObj) {
  // Adds a new object to json file
  let data = [];

  if (fs.existsSync(DATAFILE)) {
    //check if file exists

    const text = fs.readFileSync(DATAFILE, "utf-8"); //read file and convert json text to array
    data = text ? JSON.parse(text) : [];
  } else {
    return false;
  }

  data.push(eventObj); // add new object to array

  fs.writeFileSync(DATAFILE, JSON.stringify(data, null, 2)); //Save updated array

  return true;
}

function getAll() {
  let data = [];

  if (fs.existsSync(DATAFILE)) {
    //check if file exists

    const text = fs.readFileSync(DATAFILE, "utf-8"); //read file and convert json text to array
    data = text ? JSON.parse(text) : [];
  }
  return data;
}

function getOne(eventId) {
  let allEvents = getAll();

  const event = allEvents.find((e) => e.eventId === eventId);
  if (!event) {
    console.log(`Event id ${eventId} not found`);
    return null;
  }
  return event;
}
function update(eventObj) {
  // decided to use a 'full repacement approach
  let events = getAll();

  let updateObj = events.find(e => e.eventId === eventObj.eventId);

  if (!updateObj) {
    console.log(`Update fail - invalid id`);
    return false;
  } else {

  }
  
  return true;
}


module.exports = { add, getAll, getOne, update, remove };
