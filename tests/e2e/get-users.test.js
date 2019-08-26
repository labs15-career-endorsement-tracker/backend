const request = require("supertest")

const { version } = require("../../src/config")
const db = require("../../data")
const app = require("../../src/app")
const { fakeUsers } = require("../fixtures")

describe("GET /users", () => {
    beforeAll(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert({ title: "Web" })
        await db("users").insert(fakeUsers)
        done()
    })

    afterAll(async done => {
        await db.destroy()
        done()
    })

    it("returns a list of users", done => {
        request(app)
            .get(`/api/v${version}/users`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                const usersList = res.body
                expect(usersList).toHaveLength(1)
                expect(usersList[0]).toHaveProperty("first_name")
                expect(usersList[0]).toHaveProperty("last_name")
                expect(usersList[0]).toHaveProperty("email")
                expect(usersList[0]).toHaveProperty("password")
                expect(usersList[0]).toHaveProperty("tracks_id")
                done()
            })
    })
})
