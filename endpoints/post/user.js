const mongoose = require("mongoose")
require("dotenv").config()

const user = require("../../models/user")

const dbUrl = process.env.DB_URL
const dbName = process.env.DB_NAME

function connect(userData) {
  return new Promise((res, rej) => {
    mongoose.connect(`${dbUrl}/${dbName}`)

    let db = mongoose.connection

    db.once('open', () => {
      addUser(userData)
        .then((user) => {
          res(user)
          db.close()
        }, (err) => console.log(err))
    })
    db.on('error', (err) => {
      console.error.bind(console, 'connection error:')
      rej(err)
    })
  })
}

function addUser(userData) {
  return new user(userData).save()
}

module.exports = connect
