require("dotenv").config()
const chai = require("chai")
const chaiHttp = require("chai-http")

const should = chai.should()

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
})
