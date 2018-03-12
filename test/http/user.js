require("dotenv").config()
const chai = require("chai")
const chaiHttp = require("chai-http")

const should = chai.should()
const expect = chai.expect

const appUrl = process.env.APP_URL
const dbUrl = process.env.DB_URL

chai.use(chaiHttp)

describe("/user", () => {
  const testJSON = {
    "email": "test@test.test",
    "forename": "Namey",
    "surname": "McNameFace",
    "created": (new Date()).toISOString()
  }

  describe("GET /user", () => {
    it("it should try GET a user without an ID or query and fail", (done) => {
      chai.request(appUrl)
        .get("/user")
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.an("object")
          res.body.should.have.any.keys(
            "error"
          )
          res.body.error.should.equal("Did you mean to GET this url, but with a user ID?")
          done()
        })
    })
  })

  describe("GET /user with queries", () => {
    it("it should GET a user via forename and return an array of users with that name", (done) => {
      chai.request(appUrl)
        .get("/user")
        .query({ "forename": testJSON.forename })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an("array")
          if(res.body.length > 0) {
            res.body[0].should.have.any.keys(
              "forename"
            )
            res.body[0].forename.should.equal(testJSON.forename)
          }
          done()
        })
    })

    it("it should GET a user via surname and return an array of users with that name", (done) => {
      chai.request(appUrl)
        .get("/user")
        .query({ "surname": testJSON.surname })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an("array")
          if(res.body.length > 0) {
            res.body[0].should.have.any.keys(
              "surname"
            )
            res.body[0].surname.should.equal(testJSON.surname)
          }
          done()
        })
    })

    it("it should GET a user via forename and surname and return an array of users with those names", (done) => {
      let testQuery = {
        "forename": testJSON.forename,
        "surname": testJSON.surname
      }
      chai.request(appUrl)
        .get("/user")
        .query(testQuery)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an("array")
          if(res.body.length > 0) {
          res.body[0].should.have.any.keys(
              "forename",
              "surname"
            )
            res.body[0].should.contain(testQuery)
          }
          done()
        })
    })

    it("it should GET a user via an unsupported query and return an error", (done) => {
      chai.request(appUrl)
        .get("/user")
        .query({ wrongQuery: "wrong" })
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.an("object")
          res.body.error.should.equal("Unsupported query")
          done()
        })
    })
  })

  describe("GET /user/new", () => {
    it("it should try GET a new user and receive an object with an error", (done) => {
      chai.request(appUrl)
        .get("/user/new")
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.an("object")
          res.body.error.should.equal("Did you mean to POST this url?")
          done()
        })
    })
  })

  describe("POST /user/new", () => {
    it("it should POST a new user and receive an object with the same data and a new id", (done) => {
      chai.request(appUrl)
        .post("/user/new")
        .send(testJSON)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an("object")
          res.body.should.have.keys(
            "__v",
            "_id",
            "email",
            "forename",
            "surname",
            "created"
          )
          res.body.should.contain(testJSON)
          done()
        })
    })
  })
})
