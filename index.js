const express = require("express")
const user = require("./endpoints/user")
const app = express()

app.get("/", (req, res) => res.send("Hello world!"))

app.get("/user", (req, res) => {
  user.doSomething()
    .then((response) => {
      res.setHeader("Content-Type", "application/json")
      res.send(response)
    })
})

const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
