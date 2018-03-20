# Tech test for HolidayExtras
This is the back end portion of the tech test for HolidayExtras

# Getting Started
## Installing
- `npm install` should do all the heavy lifting.
- `npm start` runs the server.

## Running
- `node index.js`/`npm start` runs a Node Express server on port 3000.

### Endpoints
#### GET
- URL: `<url>/user/<id>`
  - Params:
    - `<id>` - user id

- URL: `<url>/user?forename=<forename>`
  - Params:
    - `<forename>` - user forename (case sensitive currently)

- URL: `<url>/user?surname=<surname>`
  - Params:
    - `<surname>` - user surname (case sensitive currently)

- URL: `<url>/user?forename=<forename>&surname=<surname>`
  - Params:
    - `<forename>` - user forename (case sensitive currently)
    - `<surname>` - user surname (case sensitive currently)

#### POST
- URL: `<url>/user/new`
  - Params:
    - `email`:`String` - user email
    - `forename`:`String` - user forename
    - `surname`:`String` - user surname

## TODO
- More testing
- Updating user data endpoint
- Case insensitive name searching (or use lowercase names for search, mixed for display)

## Built With
- [Express](https://expressjs.com/)
- [Mongodb](https://www.mongodb.com/)
- [Mongoose](http://mongoosejs.com/)
- [Chai](http://www.chaijs.com/)
- [Mocha](https://mochajs.org/)
- [Nodemon](https://github.com/remy/nodemon/)
