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

describe("GET /view-requirements", () => {
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
            .get(`/api/v${version}/view-requirements`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 401 when bad token is present", done => {
        request(app)
            .get(`/api/v${version}/view-requirements`)
            .set("Accept", "application/json")
            .set("authorization", `trash can token`)
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 200 when token is present", done => {
        return request(app)
            .get(`/api/v${version}/view-requirements`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => done())
    })
    it("should return an array", done => {
        return request(app)
            .get(`/api/v${version}/view-requirements`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toEqual(expect.any(Array))
                done()
            })
    })
})
