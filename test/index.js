require("dotenv").config()
const chai = require("chai")
const chaiHttp = require("chai-http")

const should = chai.should()
const expect = chai.expect

const appUrl = process.env.APP_URL

chai.use(chaiHttp)

describe("/user", () => {
  describe("GET /user/new", () => {
    it("it should try GET a new user and receive an object with an error", (done) => {
      chai.request(appUrl)
        .get("/user/new")
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.error.should.equal("Did you mean to POST this url?")
          done()
        })
    })
  })

  describe("POST /user/new", () => {
    it("it should POST a new user and receive an object with the same data and a new id", (done) => {
      chai.request(appUrl)
        .post("/user/new")
        .send(
          {
            "email": "test@test.test",
            "forename": "Namey",
            "surname": "McNameFace",
            "created": (new Date()).toISOString()
          }
        )
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.keys(
            "__v",
            "_id",
            "email",
            "forename",
            "surname",
            "created"
          )
          done()
        })
    })
  })
})
