const request = require("supertest")

const { version } = require("../../src/config")
const db = require("../../data")
const app = require("../../src/app")
const { fakeUsers } = require("../fixtures")

describe("GET /users", () => {
    let token
    beforeAll(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert({ title: "Web" })
        await db("users").insert(fakeUsers)
        // login you need a token
        const res = await request(app)
            .post(`/api/v${version}/login`)
            .send({
                email: fakeUsers[0].email,
                password: "Password1234!"
            })
        token = res.body.token
        done()
    })
    beforeEach(async done => {
        done()
    })
    afterAll(async done => {
        await db.destroy()
        done()
    })

    it("returns a list of users", done => {
        request(app)
            .get(`/api/v${version}/users`)
            .set("authorization", `bearer ${token}`)
            .set("Accept", "application/json")
            .query({ search: "Bob" })
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                const usersList = res.body
                expect(usersList).toHaveLength(1)
                expect(usersList[0]).toHaveProperty("first_name")
                expect(usersList[0]).toHaveProperty("last_name")
                expect(usersList[0]).toHaveProperty("email")
                expect(usersList[0]).toHaveProperty("tracks_id")
                done()
            })
    })
})
