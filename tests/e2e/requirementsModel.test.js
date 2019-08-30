const db = require("../../data")

const {
    findRequirementsByTrack,
    getRequirementProgress,
    markIncomplete,
    markComplete,
    getRequirementsWithProgress
} = require("../../src/model")
const {
    fakeUsers,
    fakeTasks,
    fakeSteps,
    fakeTasksTracks,
    fakeTracks,
    fakeCompletedSteps
} = require("../fixtures")

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

    afterAll(async done => {
        await db.destroy()
        done()
    })

    describe("findRequirementsByTrack", () => {
        // the only track_id we have is 1
        it("should return an array of objects", done => {
            findRequirementsByTrack(1).then(res => {
                expect(res).toEqual(expect.any(Array))
                expect(res).toContainEqual(expect.any(Object))
                done()
            })
        })
        it("should return an array of objects with shape: {id (int), is_endorsement_requirement (bool), is_required (bool), tasks_id (int), title (string), tracks_id (int),  tasks_description (String)} ", done => {
            findRequirementsByTrack(1).then(res => {
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
                done()
            })
        })
        it("should have this object as it's first element: {title: 'Requirement 1',is_required: true, tasks_description: 'Requirement 1 description',is_endorsement_requirement: true },", done => {
            findRequirementsByTrack(1).then(res => {
                expect(res[0]).toEqual({
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
        it("should return an empty array when looking for a requirement that does not exists,", done => {
            findRequirementsByTrack(1).then(res => {
                expect(res[0]).toEqual({
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
    describe("getRequirementsWithProgress NO SEEDS", () => {
        // the only track_id we have is 1
        it("should return an array of objects", done => {
            getRequirementsWithProgress(1, 1).then(res => {
                expect(res).toEqual(expect.any(Array))
                expect(res).toContainEqual(expect.any(Object))
                done()
            })
        })
        it("should return an array of objects with shape: {id (int), is_endorsement_requirement (bool), is_required (bool), tasks_id (int), title (string), tracks_id (int),  tasks_description (String)} ", done => {
            getRequirementsWithProgress(1, 1).then(res => {
                expect(res[0]).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        is_endorsement_requirement: expect.any(Boolean),
                        is_required: expect.any(Boolean),
                        tasks_id: expect.any(Number),
                        title: expect.any(String),
                        tracks_id: expect.any(Number),
                        tasks_description: expect.any(String),
                        progress: expect.any(Number)
                    })
                )
                done()
            })
        })
        it("should have this object as it's first element: {title: 'Requirement 1',is_required: true, tasks_description: 'Requirement 1 description',is_endorsement_requirement: true },", done => {
            getRequirementsWithProgress(1, 1).then(res => {
                expect(res[0]).toEqual({
                    id: 1,
                    is_endorsement_requirement: true,
                    is_required: true,
                    tasks_id: 1,
                    title: "Requirement 1",
                    tracks_id: 1,
                    tasks_description: "Requirement 1 description",
                    progress: 0
                })
                done()
            })
        })
        it("should return an empty array when looking for a requirement that does not exists,", done => {
            getRequirementsWithProgress(1, 100).then(res => {
                expect(res).toEqual([])
                done()
            })
        })
    })
    describe("getRequirementsWithProgress SEEDS", () => {
        beforeAll(async done => {
            await db("user_steps_completed").insert(fakeCompletedSteps)
            done()
        })

        afterAll(async done => {
            await db("user_steps_completed").del()
            done()
        })
        it("should have progress property equal to  67 on the first element after seeding", done => {
            getRequirementsWithProgress(1, 1).then(res => {
                expect(res[0].progress).toBe(67)
                expect(res).toContainEqual(expect.any(Object))
                done()
            })
        })
        it("should update when a task is marked incomplete", done => {
            markIncomplete(1, 1)
                .then(() => getRequirementsWithProgress(1, 1))
                .then(res => {
                    expect(res[0].progress).toBe(33)
                    done()
                })
        })
        it("should update when a task is marked complete", done => {
            markComplete(1, 1)
                .then(() => getRequirementsWithProgress(1, 1))
                .then(res => {
                    expect(res[0].progress).toBe(67)
                    done()
                })
        })
    })
    describe("getRequirementProgress NO SEEDS", () => {
        it("should return a number", done => {
            getRequirementProgress(1, 1).then(res => {
                expect(res).toEqual(expect.any(Number))
                done()
            })
        })
        it("should return 0 when there are no seeded completed steps ", done => {
            getRequirementProgress(1, 1).then(res => {
                expect(res).toBe(0)
                done()
            })
        })
        it("should return null when you look for a requirement that does not exist", done => {
            getRequirementProgress(1, 100).then(res => {
                expect(res).toBeNull()
                done()
            })
        })
    })
    describe("getRequirementProgress SEEDS", () => {
        beforeAll(async done => {
            await db("user_steps_completed").insert(fakeCompletedSteps)
            done()
        })
        afterAll(async done => {
            await db("user_steps_completed").del()
            done()
        })
        it("should return a number", done => {
            getRequirementProgress(1, 1).then(res => {
                expect(res).toEqual(expect.any(Number))
                done()
            })
        })
        it("should return 67 with the test seeds", done => {
            getRequirementProgress(1, 1).then(res => {
                expect(res).toBe(67)
                done()
            })
        })
        it("should update when a task is marked incomplete", done => {
            markIncomplete(1, 1)
                .then(() => getRequirementProgress(1, 1))
                .then(res => {
                    expect(res).toBe(33)
                    done()
                })
        })
        it("should update when a task is marked complete", done => {
            markComplete(1, 1)
                .then(() => getRequirementProgress(1, 1))
                .then(res => {
                    expect(res).toBe(67)
                    done()
                })
        })
    })
})
