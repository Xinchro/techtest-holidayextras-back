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
  getUser(req.params.id)
   .then((response) => {
      res.setHeader("Content-Type", "application/json")
      res.status(404)
      res.send({
        "error": "Did you mean to GET this url, but with a user ID?"
      })
   })
})

app.get("/user/:id", (req, res) => {
  getUser(req.params.id)
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
