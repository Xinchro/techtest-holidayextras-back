const mongoose = require("mongoose")
require("dotenv").config()

const user = require("../../models/user")

const dbUrl = process.env.DB_URL
const dbName = process.env.DB_NAME

function connect(query, flag) {
  return new Promise((res, rej) => {
    mongoose.connect(`${dbUrl}/${dbName}`)

    let db = mongoose.connection

    db.once('open', () => {
      searchVia(query, flag)
        .then((response) => {
          res(response)
          db.close()
        }, (err) => console.log(err))
    })
    db.on('error', (err) => {
      console.error.bind(console, 'connection error:')
      rej(err)
    })
  })
}

function searchVia(query, flag) {
  switch(flag) {
    case "id":
      return getUserViaId(query)
      break
    case "fullname":
      return getUserViaFullname(query)
      break
    case "forename":
      return getUserViaForename(query)
      break
    case "surname":
      return getUserViaSurname(query)
      break
    default:
      console.error("Unsupported search flag")
      return {
        "code": 500,
        "error": "Unsupported search flag"
      }
  }
}

function getUserViaId(userid) {
  return user.findOne({ "_id": userid })
}

function getUserViaFullname(fullname) {
  return user.find({
    "forename": fullname.forename,
    "surname": fullname.surname
  })
}

function getUserViaForename(forename) {
  return user.find({ "forename": forename })
}

function getUserViaSurname(surname) {
  return user.find({ "surname": surname })
}

module.exports = connect
