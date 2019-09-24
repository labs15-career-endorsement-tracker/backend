const request = require("supertest")

const { version } = require("../../src/config")
const db = require("../../data")
const app = require("../../src/app")
const { generateJwt } = require("../../src/utils")
const {
    fakeUsers,
    fakeTasks,
    fakeSteps,
    fakeTasksTracks,
    fakeTracks,
    fakeResources
} = require("../fixtures")

describe("GET /users/:userId/requirements", () => {
    beforeAll(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert(fakeTracks)
        await db("users").insert([
            {
                first_name: "Test",
                last_name: "Test",
                email: "test@test.com",
                password: "Password1234!",
                tracks_id: null,
                is_admin: true
            },
            ...fakeUsers
        ])
        await db("tasks").insert(fakeTasks)
        await db("tasks_tracks").insert(fakeTasksTracks)
        await db("steps").insert(fakeSteps)
        await db("resources").insert(fakeResources)
        done()
    })

    afterAll(async done => {
        await db.destroy()
        done()
    })

    it("Sends a 403 if the requesting user is not a coach", done => {
        request(app)
            .get(`/api/v${version}/users/2/requirements`)
            .set(
                "authorization",
                `bearer ${generateJwt({ userId: 2, is_admin: false })}`
            )
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(403)
            .then(() => {
                done()
            })
    })
    it("Sends a 404 if the requested user does not exist", done => {
        request(app)
            .get(`/api/v${version}/users/20000/requirements`)
            .set(
                "authorization",
                `bearer ${generateJwt({ userId: 1, is_admin: true })}`
            )
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404)
            .then(() => {
                done()
            })
    })
    it("Returns a list of requirements for a specified user", done => {
        request(app)
            .get(`/api/v${version}/users/2/requirements`)
            .set(
                "authorization",
                `bearer ${generateJwt({ userId: 1, is_admin: true })}`
            )
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveLength(2)
                done()
            })
            .catch(done)
    })
})
