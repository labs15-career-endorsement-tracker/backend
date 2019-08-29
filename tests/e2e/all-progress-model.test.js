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
        await db("tasks_tracks").insert(fakeTasksTracks)
        await db("steps").insert(fakeSteps)
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
        // the only track_id we have is 1
        it("should return an object", done => {
            findUserNoPassword(1).then(res => {
                expect(res).toEqual(expect.any(Object))
                done()
            })
        })
        it("should return an array of objects with shape: {id (int), first_name (string), last_name (string), email (string), tracks_id (int), is_admin (bool)} ", done => {
            findUserNoPassword(1).then(res => {
                expect(res).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        first_name: expect.any(String),
                        last_name: expect.any(String),
                        email: expect.any(String),
                        tracks_id: expect.any(Number),
                        is_admin: expect.any(Boolean)
                    })
                )
                done()
            })
        })
        it("should not have a password field ", done => {
            findUserNoPassword(1).then(res => {
                expect(res[0]).toEqual(
                    expect.not.objectContaining({
                        password: expect.any(String)
                    })
                )
                done()
            })
        })
        it("should have this object as it's first element: { first_name: 'bob',last_name: 'ross', email: 'bob_ross@happylittlemistakes.com', tracks_id: 1, is_admin: false, id: 1 },", done => {
            findUserNoPassword(1).then(res => {
                expect(res).toEqual({
                    first_name: "bob",
                    last_name: "ross",
                    email: "bob_ross@happylittlemistakes.com",
                    tracks_id: 1,
                    is_admin: false,
                    id: 1
                })
                done()
            })
        })
    })
    describe("getUserWithProgress", () => {
        it("should return an object", done => {
            getUserWithProgress(1).then(res => {
                expect(res).toEqual(expect.any(Object))
                done()
            })
        })
        it("should return an object with shape: {id (int), first_name (string), last_name (string), email (string), tracks_id (int), is_admin (bool), progress (int)} ", done => {
            getUserWithProgress(1).then(res => {
                expect(res).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        first_name: expect.any(String),
                        last_name: expect.any(String),
                        email: expect.any(String),
                        tracks_id: expect.any(Number),
                        is_admin: expect.any(Boolean),
                        progress: expect.any(Number)
                    })
                )
                done()
            })
        })
        it("should have this object as it's first element: { first_name: 'bob',last_name: 'ross', email: 'bob_ross@happylittlemistakes.com', tracks_id: 1, is_admin: false, id: 1 },", done => {
            debugger
            getUserWithProgress(1).then(res => {
                expect(res).toEqual({
                    first_name: "bob",
                    last_name: "ross",
                    email: "bob_ross@happylittlemistakes.com",
                    tracks_id: 1,
                    is_admin: false,
                    id: 1,
                    progress: 0
                })
                done()
            })
        })
        it("should return updated data if a step is marked complete", done => {
            markComplete(1, 3)
                .then(() => getUserWithProgress(1))
                .then(res => {
                    expect(res).toEqual({
                        first_name: "bob",
                        last_name: "ross",
                        email: "bob_ross@happylittlemistakes.com",
                        tracks_id: 1,
                        is_admin: false,
                        id: 1,
                        progress: 33
                    })
                    done()
                })
        })
        it("should return updated data if a step is marked incomplete", done => {
            markIncomplete(1, 3)
                .then(() => getUserWithProgress(1))
                .then(res => {
                    expect(res).toEqual({
                        first_name: "bob",
                        last_name: "ross",
                        email: "bob_ross@happylittlemistakes.com",
                        tracks_id: 1,
                        is_admin: false,
                        id: 1,
                        progress: 0
                    })
                    done()
                })
        })
    })
})
