const express = require("express")
const addUser = require("./endpoints/post/user")
const getUser = require("./endpoints/get/user")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())

/*
  ----------
    ROUTES
  ----------
*/
app.get("/", (req, res) => res.send("Hello world!"))

app.get("/user/new", (req, res) => {
  res.setHeader("Content-Type", "application/json")
  res.status(404)
  res.send({
    "error": "Did you mean to POST this url?"
  })
})

app.post("/user/new", (req, res) => {
  addUser(req.body)
    .then((response) => {
      res.setHeader("Content-Type", "application/json")
      res.send(response)
    })
})

app.get("/user", (req, res) => {
  if(Object.keys(req.query).length > 0) {
    if(req.query.forename && req.query.lastname) {
      getUser({ "forename": req.query.forename, "surname": req.query.surname }, "fullname")
       .then((response) => {
          res.setHeader("Content-Type", "application/json")
          res.send(response)
       })
    } else
    if(req.query.forename) {
      getUser(req.query.forename, "forename")
       .then((response) => {
          res.setHeader("Content-Type", "application/json")
          res.send(response)
       })
    } else
    if(req.query.surname) {
      getUser(req.query.surname, "surname")
       .then((response) => {
          res.setHeader("Content-Type", "application/json")
          res.send(response)
       })
    } else {
      res.setHeader("Content-Type", "application/json")
      res.status(404)
      res.send({
        "error": "Unsupported query"
      })
    }
  } else {
    res.setHeader("Content-Type", "application/json")
    res.status(404)
    res.send({
      "error": "Did you mean to GET this url, but with a user ID?"
    })
  }
})

app.get("/user/:id", (req, res) => {
  getUser(req.params.id, "id")
   .then((response) => {
      res.setHeader("Content-Type", "application/json")
      res.send(response)
   })
})

app.post("/user", (req, res) => {
  res.setHeader("Content-Type", "application/json")
  res.send({
    "error": "Did you mean to GET this url?"
  })
})



const port = 3000
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app
module.exports.server = server
