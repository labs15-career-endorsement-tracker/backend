const request = require("supertest")

const { version } = require("../../src/config")
const db = require("../../data")
const app = require("../../src/app")
const {
    fakeUsers,
    fakeTasks,
    fakeSteps,
    fakeTasksTracks,
    fakeTracks
} = require("../fixtures")

// const url = `/api/v${version}/view-requirements`

describe("GET /view-requirements", () => {
    beforeAll(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert(fakeTracks)
        await db("users").insert(fakeUsers)
        await db("tasks").insert(fakeTasks)
        await db("tasks_tracks").insert(fakeTasksTracks)
        await db("steps").insert(fakeSteps)
        done()
    })

    // beforeEach(async done => {
    //     done()
    // })

    afterAll(async done => {
        await db.destroy()
        done()
    })

    it("should return status 401 when no token is present", done => {
        request(app)
            .get(`/api/v${version}/view-requirements`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
})
