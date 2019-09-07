const db = require("../../data")
const { findResourcesForRequirement } = require("../../src/model")
const {
    fakeUsers,
    fakeTasks,
    fakeSteps,
    fakeTasksTracks,
    fakeTracks,
    fakeCompletedSteps,
    fakeResources
} = require("../fixtures")

describe("MODEL resources", () => {
    beforeAll(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert(fakeTracks)
        await db("users").insert(fakeUsers)
        await db("tasks").insert(fakeTasks)
        await db("tasks_tracks").insert(fakeTasksTracks)
        await db("steps").insert(fakeSteps)
        await db("user_steps_completed").insert(fakeCompletedSteps)
        await db("resources").insert(fakeResources)
        done()
    })

    afterAll(async done => {
        await db.destroy()
        done()
    })

    describe("findResourcesForRequirement", () => {
        it("should return an array of objects", done => {
            findResourcesForRequirement(1).then(res => {
                expect(res).toEqual(expect.any(Array))
                expect(res).toContainEqual(expect.any(Object))
                done()
            })
        })
        it("should return an array of objects with shape: {id (int), type (string), title (string), url (string), tasks_id (int)} ", done => {
            findResourcesForRequirement(1).then(res => {
                expect(res[0]).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        type: expect.any(String),
                        title: expect.any(String),
                        url: expect.any(String),
                        tasks_id: expect.any(Number)
                    })
                )
                done()
            })
        })
        it("should return an empty array on a requirement that does not exist,", done => {
            findResourcesForRequirement(100).then(res => {
                expect(res).toEqual([])
                done()
            })
        })
        it("should have this object as it's first element: { id: 1, type: 'google_doc', title: 'Action verbs for technical resumes', url:'https://docs.google.com/document/d/1wZkDPBWtQZDGGdvStD61iRx_jOWVlIyyQl9UOYHtZgA/edit',description: null,tasks_id: 1 },", done => {
            findResourcesForRequirement(1).then(res => {
                expect(res[0]).toEqual({
                    id: 1,
                    type: "google_doc",
                    title: "Action verbs for technical resumes",
                    url:
                        "https://docs.google.com/document/d/1wZkDPBWtQZDGGdvStD61iRx_jOWVlIyyQl9UOYHtZgA/edit",
                    description: null,
                    tasks_id: 1
                })
                done()
            })
        })
    })
})
