const request = require("supertest")

const { version } = require("../../src/config")
const db = require("../../data")
const app = require("../../src/app")
const { fakeUsers } = require("../fixtures")

describe("POST /login", () => {
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

    it("returns jwt after successful login w/ email & password", done => {
        request(app)
            .post(`/api/v${version}/login`)
            .send({ email: fakeUsers[0].email, password: "Password1234!" })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty("token")
                expect(res.body).toHaveProperty("userId")
                done()
            })
    })

    it("throws 400 Error when email is invalid", done => {
        request(app)
            .post(`/api/v${version}/login`)
            .send({
                email: "invalid_email",
                password: "Password1234!"
            })
            .expect(400)
            .then(res => {
                expect(res.body).toHaveProperty("message")
                expect(res.body.name).toEqual("BadRequestError")
                expect(res.body.statusCode).toEqual(400)
                done()
            })
    })

    it("throws 400 Error when password is invalid", done => {
        request(app)
            .post(`/api/v${version}/login`)
            .send({
                email: fakeUsers[0].email,
                password: "short"
            })
            .expect(400)
            .then(res => {
                expect(res.body).toHaveProperty("message")
                expect(res.body.name).toEqual("BadRequestError")
                expect(res.body.statusCode).toEqual(400)
                done()
            })
    })

    it("throws 401 Error when email and/or password are incorrect", done => {
        request(app)
            .post(`/api/v${version}/login`)
            .send({
                email: fakeUsers[0].email,
                password: "ValidIncorrect!"
            })
            .expect(401)
            .then(res => {
                expect(res.body.message).toEqual("Incorrect credentials")
                expect(res.body.name).toEqual("UnauthorizedError")
                expect(res.body.statusCode).toEqual(401)
                done()
            })
    })
})
