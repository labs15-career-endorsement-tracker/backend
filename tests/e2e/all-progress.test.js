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
    fakeCompletedSteps,
    fakeCoaches
} = require("../fixtures")

// NEED TO FIX THE MODEL FIRST
describe.skip("GET /users/:userId", () => {
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
    it("should return status 200 when a coach looks up another user's information", done => {
        let coachToken
        request(app)
            .post(`/api/v${version}/login`)
            .send({
                email: fakeCoaches[0].email,
                password: "Password1234!"
            })
            .then(res => {
                coachToken = res.body.token
                request(app)
                    .get(`/api/v${version}/requirements/100/steps/1`)
                    .set("Accept", "application/json")
                    .set("authorization", `bearer ${coachToken}`)
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then(() => done())
            })
    })
    it("should return status 200 when a user looks up their own information and token is present", done => {
        return request(app)
            .get(`/api/v${version}/users/1`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .send({ is_complete: false })
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => done())
    })
    it("should return status 409 when user tries to mark complete task complete", done => {
        request(app)
            .get(`/api/v${version}/requirements/100/steps/1`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .send({ is_complete: false })
            .expect("Content-Type", /json/)
            .expect(409)
            .then(res => done())
    })
    it("should return an array of objects with shape: {id (int), number (int), is_required (bool), tasks_id (int), is_complete (bool)} ", done => {
        return request(app)
            .get(`/api/v${version}/users/1`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body[0]).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        is_required: expect.any(Boolean),
                        tasks_id: expect.any(Number),
                        steps_description: expect.any(String),
                        number: expect.any(Number),
                        is_complete: expect.any(Boolean)
                    })
                )
                done()
            })
    })
    it("should mark a task complete when the user sends {is_complete: false} ", done => {
        return request(app)
            .get(`/api/v${version}/users/1`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .send({ is_complete: false })
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body[0]).toEqual(
                    expect.objectContaining({
                        is_complete: true
                    })
                )
                done()
            })
    })
    it("should mark a task incomplete when the user sends {is_complete: true} ", done => {
        return request(app)
            .get(`/api/v${version}/users/1`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body[0]).toEqual(
                    expect.objectContaining({
                        is_complete: false
                    })
                )
                done()
            })
    })
})
