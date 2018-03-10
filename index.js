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

app.get("/user/:id", (req, res) => {
  getUser(req.params.id)
   .then((response) => {
      res.setHeader("Content-Type", "application/json")
      res.send(response)
   })
})

app.post("/user/new", (req, res) => {
  console.log(req.body)
  addUser(req.body)
    .then((response) => {
      res.setHeader("Content-Type", "application/json")
      res.send(response)
    })
})


const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
