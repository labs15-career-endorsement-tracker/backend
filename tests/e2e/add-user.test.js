const request = require("supertest")
const { compare } = require("bcryptjs")

const { version } = require("../../src/config")
const db = require("../../data")
const app = require("../../src/app")
const { fakeUsers } = require("../fixtures")

describe("POST /users", () => {
    beforeEach(async done => {
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
        const bob = fakeUsers[0]
        bob.password = "Password1234!"

        request(app)
            .post(`/api/v${version}/users`)
            .send(bob)
            .set("Accept", "application/json")
            .expect(201)
            .then(async res => {
                const user = res.body
                expect(user).toHaveProperty("userId")
                done()
            })
    })

    it("hashes user's password correctly", done => {
        const bob = fakeUsers[0]
        bob.password = "Password1234!"

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
        const bob = fakeUsers[0]
        bob.password = "Password1234!"

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
})
