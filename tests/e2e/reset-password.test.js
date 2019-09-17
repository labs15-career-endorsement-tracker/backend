const request = require("supertest")

const { version } = require("../../src/config")
const db = require("../../data")
const app = require("../../src/app")
const { fakeUsers } = require("../fixtures")

describe("POST /reset-password", () => {
    beforeAll(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert({ title: "Web" })
        await db("users").insert(fakeUsers)
        done()
    })

    beforeEach(async done => {
        done()
    })

    afterAll(async done => {
        await db.destroy()
        done()
    })

    it("returns 200 if email is valid", done => {
        request(app)
            .post(`/api/v${version}/reset-password`)
            .send({ email: fakeUsers[0].email })
            .expect(200)
            .then(_ => done())
    })

    it("throws 401 Error when email is invalid", done => {
        request(app)
            .post(`/api/v${version}/reset-password`)
            .send({
                email: "invalid_email@email.com"
            })
            .expect(401)
            .then(res => {
                expect(res.body).toHaveProperty("message")
                expect(res.body.name).toEqual("UnauthorizedError")
                expect(res.body.statusCode).toEqual(401)
                done()
            })
    })
})
