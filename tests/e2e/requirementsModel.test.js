const db = require("../../data")
const {
    findRequirementsByTrack,
    getRequirementsWithProgress
} = require("../../src/model")
const {
    fakeUsers,
    fakeTasks,
    fakeSteps,
    fakeTasksTracks,
    fakeTracks
} = require("../fixtures")

// const url = `/api/v${version}/view-requirements`

describe("MODEL requirements", () => {
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

    // beforeEach(async done => {
    //     done()
    // })

    afterAll(async done => {
        await db.destroy()
        done()
    })

    describe("findRequirementsByTrack", () => {
        // the only track_id we have is 1
        it("should return an array of objects", done => {
            findRequirementsByTrack(1)
                .then(res => {
                    expect(res).toEqual(expect.any(Array))
                    expect(res).toContainEqual(expect.any(Object))
                })
                .then(() => done())
        })
        it("should return an array of objects with shape: {id (int), is_endorsement_requirement (bool), is_required (bool), tasks_id (int), title (string), tracks_id (int),  tasks_description (String)} ", done => {
            findRequirementsByTrack(1)
                .then(res => {
                    expect(res[0]).toEqual(
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
                })
                .then(() => done())
        })
        it("should have this object as it's first element: {title: 'Requirement 1',is_required: true, tasks_description: 'Requirement 1 description',is_endorsement_requirement: true },", done => {
            findRequirementsByTrack(1)
                .then(res => {
                    expect(res[0]).toEqual({
                        id: 1,
                        is_endorsement_requirement: true,
                        is_required: true,
                        tasks_id: 1,
                        title: "Requirement 1",
                        tracks_id: 1,
                        tasks_description: "Requirement 1 description"
                    })
                })
                .then(() => done())
        })
    })
})
