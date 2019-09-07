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

describe("PUT /requirements/:requirementsId/steps/:stepsId", () => {
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
            .put(`/api/v${version}/requirements/1/steps/1`)
            .set("Accept", "application/json")
            .send({ is_complete: true })
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 401 when bad token is present", done => {
        request(app)
            .put(`/api/v${version}/requirements/1/steps/1`)
            .set("Accept", "application/json")
            .set("authorization", `trash can token`)
            .send({ is_complete: true })
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 404 when a non-existent requirement id is given", done => {
        request(app)
            .put(`/api/v${version}/requirements/100/steps/1`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .send({ is_complete: true })
            .expect("Content-Type", /json/)
            .expect(404)
            .then(res => done())
    })
    it("should return status 400 when user mistakenly sends is_complete as a string (or anything that's not a boolean)", done => {
        request(app)
            .put(`/api/v${version}/requirements/100/steps/1`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .send({ is_complete: "true" })
            .expect("Content-Type", /json/)
            .expect(400)
            .then(res => done())
    })
    it("should return status 400 when user tries to mark incomplete task incomplete", done => {
        request(app)
            .put(`/api/v${version}/requirements/100/steps/1`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .send({ is_complete: true })
            .expect("Content-Type", /json/)
            .expect(400)
            .then(res => done())
    })
    it("should return status 200 when token is present", done => {
        return request(app)
            .put(`/api/v${version}/requirements/1/steps/1`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .send({ is_complete: false })
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => done())
    })
    it("should return status 409 when user tries to mark complete task complete", done => {
        request(app)
            .put(`/api/v${version}/requirements/100/steps/1`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .send({ is_complete: false })
            .expect("Content-Type", /json/)
            .expect(409)
            .then(res => done())
    })
    it("should return an array of objects with shape: {id (int), number (int), is_required (bool), tasks_id (int), is_complete (bool)} ", done => {
        return request(app)
            .put(`/api/v${version}/requirements/1/steps/1`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .send({ is_complete: true })
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
            .put(`/api/v${version}/requirements/1/steps/1`)
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
            .put(`/api/v${version}/requirements/1/steps/1`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .send({ is_complete: true })
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
