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
            .get(`/api/v${version}/requirements`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 401 when bad token is present", done => {
        request(app)
            .get(`/api/v${version}/requirements`)
            .set("Accept", "application/json")
            .set("authorization", `trash can token`)
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 200 when token is present", done => {
        return request(app)
            .get(`/api/v${version}/requirements`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => done())
    })
    it("should return an array of objects", done => {
        return request(app)
            .get(`/api/v${version}/requirements`)
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
    it("should return an array of objects with shape: {id (int), is_endorsement_requirement (bool), is_required (bool), tasks_id (int), title (string), tracks_id (int),  tasks_description (String)} ", done => {
        return request(app)
            .get(`/api/v${version}/requirements`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body[0]).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        is_endorsement_requirement: expect.any(Boolean),
                        is_required: expect.any(Boolean),
                        tasks_id: expect.any(Number),
                        title: expect.any(String),
                        tracks_id: expect.any(Number),
                        tasks_description: expect.any(String)
                    })
                )
                done()
            })
    })
    it("should have this object as it's first element: {title: 'Requirement 1',is_required: true, tasks_description: 'Requirement 1 description',is_endorsement_requirement: true },", done => {
        return request(app)
            .get(`/api/v${version}/requirements`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body[0]).toEqual({
                    id: 1,
                    is_endorsement_requirement: true,
                    is_required: true,
                    tasks_id: 1,
                    title: "Requirement 1",
                    tracks_id: 1,
                    tasks_description: "Requirement 1 description"
                })
                done()
            })
    })
})
