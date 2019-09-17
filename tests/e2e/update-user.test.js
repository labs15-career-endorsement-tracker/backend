const request = require("supertest")

const { version, emailConfig } = require("../../src/config")
const db = require("../../data")
const app = require("../../src/app")
const { fakeUsers } = require("../fixtures")
const { generateJwt } = require("../../src/utils")

describe("POST /reset-password", () => {
    let token
    beforeAll(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert({ title: "Web" })
        await db("users").insert(fakeUsers)
        done()
    })

    beforeEach(async done => {
        token = generateJwt({ userId: 1 }, emailConfig.secret)
        done()
    })

    afterAll(async done => {
        await db.destroy()
        done()
    })

    it("returns 200 if password was updated", done => {
        request(app)
            .put(`/api/v${version}/users`)
            .set("authorization", `bearer ${token}`)
            .send({ password: "Password1234" })
            .expect(200)
            .then(_ => done())
    })
})
