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

describe("GET /requirements", () => {
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

    afterAll(async done => {
        await db.destroy()
        done()
    })

    it("should return status 401 when no token is present", done => {
        request(app)
            .get(`/api/v${version}/requirements/1/steps`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 401 when bad token is present", done => {
        request(app)
            .get(`/api/v${version}/requirements/1/steps`)
            .set("Accept", "application/json")
            .set("authorization", `trash can token`)
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 404 when a non-existent requirement id is given", done => {
        request(app)
            .get(`/api/v${version}/requirements/100/steps`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(404)
            .then(res => done())
    })
    it("should return status 200 when token is present", done => {
        return request(app)
            .get(`/api/v${version}/requirements/1/steps`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => done())
    })
    it("should return an array of objects", done => {
        return request(app)
            .get(`/api/v${version}/requirements/1/steps`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toEqual(expect.any(Array))
                expect(res.body).toContainEqual(expect.any(Object))
                done()
            })
    })
    it("should return an array of objects with shape: {id (int), number (int), is_required (bool), tasks_id (int), is_complete (bool)} ", done => {
        return request(app)
            .get(`/api/v${version}/requirements/1/steps`)
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
    it("should have this object as it's first element: { number: 1, steps_description: 'Requirement 1 step 1', is_required: true, tasks_id: 1, is_complete: true },", done => {
        return request(app)
            .get(`/api/v${version}/requirements/1/steps`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body[0]).toEqual({
                    ...fakeSteps[0],
                    id: 1,
                    is_complete: true
                })
                done()
            })
    })
})
