const fs = require('fs');
const USER_DATA_FILE = "users.json"

module.exports = {
    add(obj) { // Adds a new object to json file
        let data = [];

        if (fs.existsSync(USER_DATA_FILE)) { //check if file exists

            const text = fs.readFileSync(USER_DATA_FILE, 'utf-8'); //read file and convert json text to array
            data = text ? JSON.parse(text) : [];

        }

        data.push(obj); // add new object to array

        fs.writeFileSync(USER_DATA_FILE, JSON.stringify(data, null, 2)); //Save updated array

        return true;
    },
    getOne(key, value) {// Get one = find one object by key/value
        let data = [];

        if (fs.existsSync(USER_DATA_FILE)) {
            const text = fs.readFileSync(USER_DATA_FILE, 'utf-8');
            data = text ? JSON.parse(text) : [];
        }

        return data.find(item => item[key] === value) || null; //find first matching objecvalue
    },

    getAll() { //Get all = return all objects
        if (!fs.existsSync(USER_DATA_FILE)) {
            return [];
        }

        const text = fs.readFileSync(USER_DATA_FILE, 'utf-8');

        return text ? JSON.parse(text) : [];

    }

};