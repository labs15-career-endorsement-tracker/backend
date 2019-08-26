const request = require("supertest")
const bcrypt = require("bcryptjs")

const { version } = require("../../src/config")
const db = require("../../data")
const app = require("../../src/app")

describe("POST /login", () => {
    beforeEach(done => {
        db.migrate
            .latest()
            .then(() =>
                db("tracks").insert({
                    title: "Web"
                })
            )
            .then(() =>
                db("users").insert({
                    first_name: "bob",
                    last_name: "ross",
                    email: "bob_ross@happylittlemistakes.com",
                    password: bcrypt.hashSync("Password1234!", 4),
                    tracks_id: 1
                })
            )
            .then(() => done())
    })

    afterEach(done => {
        db.destroy()
        done()
    })
    it("should return a status 200", done => {
        request(app)
            .post(`/api/v${version}/login`)
            .send({
                email: "bob_ross@happylittlemistakes.com",
                password: "Password1234!"
            })
            .expect(200)
            .then(() => done())
    })
})
