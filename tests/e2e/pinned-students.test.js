const request = require("supertest")

const { version } = require("../../src/config")
const db = require("../../data")
const app = require("../../src/app")
const {
    fakeUsers,
    fakeTasks,
    fakeSteps,
    fakeTasksTracks,
    fakeTracks,
    fakeCoaches,
    fakePinnedStudents,
    fakeCompletedSteps
} = require("../fixtures")

describe("GET pinned students", () => {
    let token
    beforeAll(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert(fakeTracks)
        await db("users").insert(fakeUsers)
        await db("users").insert(fakeCoaches)
        await db("tasks").insert(fakeTasks)
        await db("tasks_tracks").insert(fakeTasksTracks)
        await db("steps").insert(fakeSteps)
        await db("user_steps_completed").insert(fakeCompletedSteps)
        await db("pinned_students").insert(fakePinnedStudents)
        // login, you need a token!
        const res = await request(app)
            .post(`/api/v${version}/login`)
            .send({
                email: fakeCoaches[0].email,
                password: "coachPassword1"
            })
        token = res.body.token
        done()
    })

    afterAll(async done => {
        await db.destroy()
        done()
    })
    // we have alredy pinned the bob user to the grace coach
    it("should return status 401 when no token is present", done => {
        request(app)
            .get(`/api/v${version}/students`)
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 401 when bad token is present", done => {
        request(app)
            .get(`/api/v${version}/students`)
            .set("authorization", `trash can token`)
            .send({ is_complete: true })
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 200 when good token is present", done => {
        request(app)
            .get(`/api/v${version}/students`)
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => done())
    })
    it("should return an array with user objects", done => {
        request(app)
            .get(`/api/v${version}/students`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toEqual(expect.any(Array))
                expect(res.body).toContainEqual(expect.any(Object))
                expect(res.body[0]).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        first_name: expect.any(String),
                        last_name: expect.any(String),
                        email: expect.any(String),
                        is_admin: expect.any(Boolean),
                        tracks_id: expect.any(Number),
                        progress: expect.any(Number)
                    })
                )
                done()
            })
    })
    it("should calculate progress accurately)", done => {
        request(app)
            .get(`/api/v${version}/students`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body[0].progress).toBe(50)
                done()
            })
    })
})
