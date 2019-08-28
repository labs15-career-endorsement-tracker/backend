const request = require("supertest")
const { compare } = require("bcryptjs")

const { version } = require("../../src/config")
const db = require("../../data")
const app = require("../../src/app")
const { fakeUsers } = require("../fixtures")

describe("POST /users", () => {
    let bob

    beforeEach(async done => {
        bob = { ...fakeUsers[0], password: "Password1234!" }
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert({ title: "Web" })
        done()
    })

    afterAll(async done => {
        await db.destroy()
        done()
    })

    it("adds a user", done => {
        request(app)
            .post(`/api/v${version}/users`)
            .send(bob)
            .set("Accept", "application/json")
            .expect(201)
            .then(async res => {
                const user = res.body
                expect(res.body).toHaveProperty("token")
                expect(res.body).toHaveProperty("userId")
                done()
            })
    })

    it("hashes user's password correctly", done => {
        request(app)
            .post(`/api/v${version}/users`)
            .send(bob)
            .set("Accept", "application/json")
            .expect(201)
            .then(async res => {
                const { userId } = res.body

                const { password } = await db("users")
                    .where("id", userId)
                    .first()

                const passwordsMatch = await compare(bob.password, password)
                expect(passwordsMatch).toBeTruthy()
                done()
            })
    })

    it("throws a 409 error if user already exists", async done => {
        await db("users").insert(fakeUsers)

        request(app)
            .post(`/api/v${version}/users`)
            .send(bob)
            .set("Accept", "application/json")
            .expect(409)
            .then(res => {
                expect(res.body).toEqual({
                    message: "User already has an account",
                    name: "ConflictError",
                    statusCode: 409
                })
                done()
            })
    })

    it("throws a 400 error if user provides invalid first_name", async done => {
        bob.first_name = ""

        request(app)
            .post(`/api/v${version}/users`)
            .send(bob)
            .set("Accept", "application/json")
            .expect(400)
            .then(async res => {
                expect(res.body).toEqual({
                    message: "Missing required key: first_name",
                    name: "BadRequestError",
                    statusCode: 400
                })

                done()
            })
    })

    it("throws a 400 error if user provides invalid last_name", async done => {
        bob.last_name = 1234

        request(app)
            .post(`/api/v${version}/users`)
            .send(bob)
            .set("Accept", "application/json")
            .expect(400)
            .then(res => {
                expect(res.body).toEqual({
                    message: "last_name must be a string",
                    name: "BadRequestError",
                    statusCode: 400
                })
                done()
            })
    })

    it("throws a 400 error if user provides invalid track_id", async done => {
        bob.tracks_id = 1234

        request(app)
            .post(`/api/v${version}/users`)
            .send(bob)
            .set("Accept", "application/json")
            .expect(400)
            .then(res => {
                expect(res.body).toEqual({
                    message: "Invalid tracks_id",
                    name: "BadRequestError",
                    statusCode: 400
                })
                done()
            })
    })
})
