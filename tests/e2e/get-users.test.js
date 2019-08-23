const request = require("supertest")

const { version } = require("../../src/config")
const db = require("../../src/data")
const app = require("../../src/app")

describe("GET /users", () => {
    beforeEach(done => {
        db.migrate.latest().then(() => done())
    })

    afterEach(done => {
        db.destroy()
        done()
    })

    it("Sends back an empty array", done => {
        request(app)
            .get(`/api/v${version}/users`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveLength(0)
                done()
            })
    })
})
