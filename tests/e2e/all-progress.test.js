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
    fakeCompletedSteps
} = require("../fixtures")

// NEED TO FIX THE MODEL FIRST
describe("GET /users/:userId", () => {
    let token
    beforeAll(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert(fakeTracks)
        await db("users").insert(fakeUsers)
        await db("tasks").insert(fakeTasks)
        await db("tasks_tracks").insert(fakeTasksTracks)
        await db("steps").insert(fakeSteps)
        await db("user_steps_completed").insert(fakeCompletedSteps)
        // login, you need a token!
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

    it("should return status 401 when no token is present", done => {
        request(app)
            .get(`/api/v${version}/users/1`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 401 when bad token is present", done => {
        request(app)
            .get(`/api/v${version}/users/1`)
            .set("Accept", "application/json")
            .set("authorization", `trash can token`)
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 401 when a user who is not a coach tries to look up another user's information", done => {
        request(app)
            .get(`/api/v${version}/users/2`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 200 when a user looks up their own information and token is present)", done => {
        request(app)
            .get(`/api/v${version}/users/1`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .send({ is_complete: "true" })
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => done())
    })
    it("should return an object with shape: {id (int), first_name (string), last_name (string), email (string), tracks_id (int), is_admin (bool), progress (int), tracks_title (string)} ", done => {
        request(app)
            .get(`/api/v${version}/users/1`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .send({ is_complete: "true" })
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        first_name: expect.any(String),
                        last_name: expect.any(String),
                        email: expect.any(String),
                        tracks_id: expect.any(Number),
                        is_admin: expect.any(Boolean),
                        progress: expect.any(Number),
                        tracks_title: expect.any(String)
                    })
                )
                done()
            })
    })
})
