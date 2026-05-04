# CSCI223-Campus-Board
## Scrum-Based Project
- Sprint 2026

========== Page Hierarchy & Server Layout ==========

==========Public Facing ==========
/ index.html - Main/Home page
/ login.html - User Login / link to register.html
/ register.html - User Registration
/ createNew.html - Create New Event/Post

========== Server Layout ==========
CSCI223-CAMPUS-BOARD/
├── docs/ - Documentation
|   ├── factory.js
|   └── schema.js
├── public/
|   ├── css/
|   |   ├── form.css
|   |   └── style.css
|   ├── static-content/
|   ├── creatNew.html - form submission: /create/event
|   ├── index.html
|   ├── login.html - form submission: /user/login
|   ├── register.html - form submission: /user/registration
├── src/
|   ├── events/
|   |   └──event-crud.js
|   ├── users/
|   |   ├── hash.js
|   |   ├── passwordUtils.js
|   |   └──user-crud.js
├── app.js
├── dataStore.js
├── factoryFunction.js
├── registerUser.js
├── userRegistration.js


