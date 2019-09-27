const db = require("../../data")
const {
    findUserNoPassword,
    getUserWithProgress,
    markComplete,
    markIncomplete
} = require("../../src/model")
const {
    fakeUsers,
    fakeTasks,
    fakeSteps,
    fakeTasksTracks,
    fakeTracks
} = require("../fixtures")

describe("MODEL all progress", () => {
    beforeAll(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert(fakeTracks)
        await db("users").insert(fakeUsers)
        await db("tasks").insert(fakeTasks)
        await db("steps").insert(fakeSteps)
        await db("tasks_tracks").insert(fakeTasksTracks)
        done()
    })

    beforeEach(async done => {
        done()
    })

    afterEach(async done => {
        done()
    })

    afterAll(async done => {
        await db.destroy()
        done()
    })

    describe("findUserNoPassword", () => {
        it("should return an object", done => {
            findUserNoPassword(1).then(res => {
                expect(res).toEqual(expect.any(Object))
                done()
            })
        })
        it("should return an object with shape: {id (int), first_name (string), last_name (string), email (string), tracks_id (int), is_admin (bool), tracks_title (string)} ", done => {
            findUserNoPassword(1)
                .then(res => {
                    expect(res).toHaveProperty("first_name", "bob")
                    expect(res).toHaveProperty("last_name", "ross")
                    expect(res).toHaveProperty(
                        "email",
                        "bob_ross@happylittlemistakes.com"
                    )
                    expect(res).toHaveProperty("tracks_id", 1)
                    expect(res).toHaveProperty("is_admin", false)
                    expect(res).toHaveProperty("id", 1)
                    expect(res).toHaveProperty("tracks_title", "Web")
                    expect(res).toHaveProperty("calendly_link", null)
                    done()
                })
                .catch(done)
        })
        it("should not have a password field ", done => {
            findUserNoPassword(1).then(res => {
                expect(res).toEqual(
                    expect.not.objectContaining({
                        password: expect.any(String)
                    })
                )
                done()
            })
        })
        it("should have this object as it's first element: { first_name: 'bob',last_name: 'ross', email: 'bob_ross@happylittlemistakes.com', tracks_id: 1, is_admin: false, id: 1, tracks_title: 'Web' },", done => {
            findUserNoPassword(1).then(res => {
                expect(res).toEqual({
                    first_name: "bob",
                    last_name: "ross",
                    email: "bob_ross@happylittlemistakes.com",
                    tracks_id: 1,
                    is_admin: false,
                    id: 1,
                    tracks_title: "Web",
                    calendly_link: null
                })
                done()
            })
        })
        it("should return undefined when looking for a user id that does not exist", done => {
            findUserNoPassword(1000).then(res => {
                expect(res).toBeUndefined()
                done()
            })
        })
    })
    describe("getUserWithProgress", () => {
        beforeEach(done => {
            done()
        })
        it("should return an object", done => {
            getUserWithProgress(1).then(res => {
                expect(res).toEqual(expect.any(Object))
                done()
            })
        })
        it("should return an object with shape: {id (int), first_name (string), last_name (string), email (string), tracks_id (int), is_admin (bool), progress (int), tracks_title (String)} ", done => {
            getUserWithProgress(1).then(res => {
                expect(res).toHaveProperty("first_name", "bob")
                expect(res).toHaveProperty("last_name", "ross")
                expect(res).toHaveProperty(
                    "email",
                    "bob_ross@happylittlemistakes.com"
                )
                expect(res).toHaveProperty("tracks_id", 1)
                expect(res).toHaveProperty("is_admin", false)
                expect(res).toHaveProperty("id", 1)
                expect(res).toHaveProperty("tracks_title", "Web")
                expect(res).toHaveProperty("calendly_link", null)
                done()
            })
        })
        it("should be this: { first_name: 'bob',last_name: 'ross', email: 'bob_ross@happylittlemistakes.com', tracks_id: 1, is_admin: false, id: 1 , tracks_title: 'Web'},", done => {
            getUserWithProgress(1).then(res => {
                expect(res).toEqual({
                    first_name: "bob",
                    last_name: "ross",
                    email: "bob_ross@happylittlemistakes.com",
                    tracks_id: 1,
                    is_admin: false,
                    id: 1,
                    progress: 0,
                    tracks_title: "Web",
                    calendly_link: null,
                    coach: null
                })
                done()
            })
        })
        it("should return updated data if a step is marked complete", done => {
            markComplete(1, 3)
                .then(() => getUserWithProgress(1))
                .then(res => {
                    expect(res.progress).toBe(17)
                    done()
                })
        })
        it("should return updated data if a step is marked complete (2)", done => {
            markComplete(1, 2)
                .then(() => getUserWithProgress(1))
                .then(res => {
                    expect(res.progress).toBe(33)
                    done()
                })
        })
        it("should return updated data if a step is marked complete (3)", done => {
            markComplete(1, 1)
                .then(() => getUserWithProgress(1))
                .then(res => {
                    expect(res.progress).toEqual(50)
                    done()
                })
        })
        it("should return updated data if a step is marked incomplete", done => {
            markIncomplete(1, 3)
                .then(() => getUserWithProgress(1))
                .then(res => {
                    expect(res.progress).toBe(33)
                    done()
                })
        })
        it("should return updated data if a step is marked incomplete (2)", done => {
            markIncomplete(1, 2)
                .then(() => getUserWithProgress(1))
                .then(res => {
                    expect(res.progress).toEqual(17)
                    done()
                })
        })
        it("should return updated data if a step is marked incomplete (3)", done => {
            markIncomplete(1, 1)
                .then(() => getUserWithProgress(1))
                .then(res => {
                    expect(res.progress).toBe(0)
                    done()
                })
        })
    })
})
