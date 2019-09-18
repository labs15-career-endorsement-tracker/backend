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

describe("DELETE /users", () => {
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
            .delete(`/api/v${version}/users`)
            .set("Accept", "application/json")
            .expect(401)
            .then(res => done())
    })
    it("should return status 401 when bad token is present", done => {
        request(app)
            .delete(`/api/v${version}/users`)
            .set("Accept", "application/json")
            .set("authorization", `trash can token`)
            .expect(401)
            .then(res => done())
    })
    it("should return status 200 when a user is successfully deleted", done => {
        request(app)
            .delete(`/api/v${version}/users`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect(200)
            .then(res => done())
    })
    it("should return status 404 when the user you are trying to delete does not exist", done => {
        request(app)
            .delete(`/api/v${version}/users`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect(404)
            .then(res => done())
    })
})
