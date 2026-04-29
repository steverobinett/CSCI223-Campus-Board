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

function getOne(id) {
  let allEvents = getAll();

  const event = allEvents.find((e) => e.id === id);
  if (!event) {
    console.log(`Event id ${id} not found`);
    return null;
  }
  return event;
}
function update(eventObj) {
  let data = getAll();

 const index = data.findIndex(e => e.id === eventObj.id);

  if (index === -1) {
    console.log(`Event id ${eventObj.id} not found`);
    return false;
  }
  data[index] = eventObj;

  fs.writeFileSync(DATAFILE, JSON.stringify(data, null, 2)); //Save updated array

  return true;
}

module.exports = { add, getAll, getOne, update };
