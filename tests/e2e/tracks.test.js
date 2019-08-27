const request = require("supertest")

const { version } = require("../../src/config")
const db = require("../../data")
const app = require("../../src/app")
const { fakeTracks, fakeUsers } = require("../fixtures")

describe("GET /tracks", () => {
    let token
    beforeAll(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert(fakeTracks)
        await db("users").insert(fakeUsers)
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
            .get(`/api/v${version}/tracks`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 401 when bad token is present", done => {
        request(app)
            .get(`/api/v${version}/tracks`)
            .set("Accept", "application/json")
            .set("authorization", `trash can token`)
            .expect("Content-Type", /json/)
            .expect(401)
            .then(res => done())
    })
    it("should return status 200 when token is present", done => {
        return request(app)
            .get(`/api/v${version}/tracks`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => done())
    })
    it("should return an array of objects", done => {
        return request(app)
            .get(`/api/v${version}/tracks`)
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
    it("should return an array of objects with shape: {id (int), title (string)} ", done => {
        return request(app)
            .get(`/api/v${version}/tracks`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body[0]).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        title: expect.any(String)
                    })
                )
                done()
            })
    })
    it("should have this object as it's first element: {title: 'Web', id: 1},", done => {
        return request(app)
            .get(`/api/v${version}/tracks`)
            .set("Accept", "application/json")
            .set("authorization", `bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body[0]).toEqual({
                    id: 1,
                    title: "Web"
                })
                done()
            })
    })
})
