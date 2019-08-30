const db = require("../../data")
const { findStepsByTask, getFormattedSteps } = require("../../src/model")
const {
    fakeUsers,
    fakeTasks,
    fakeSteps,
    fakeTasksTracks,
    fakeTracks,
    fakeCompletedSteps
} = require("../fixtures")

describe("MODEL steps", () => {
    beforeAll(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert(fakeTracks)
        await db("users").insert(fakeUsers)
        await db("tasks").insert(fakeTasks)
        await db("tasks_tracks").insert(fakeTasksTracks)
        await db("steps").insert(fakeSteps)
        await db("user_steps_completed").insert(fakeCompletedSteps)
        done()
    })

    afterAll(async done => {
        await db.destroy()
        done()
    })

    describe("findStepsByTask", () => {
        it("should return an array of objects", done => {
            findStepsByTask(1).then(res => {
                expect(res).toEqual(expect.any(Array))
                expect(res).toContainEqual(expect.any(Object))
                done()
            })
        })
        it("should return an array of objects with shape: {id (int), number (int), is_required (bool), tasks_id (int)} ", done => {
            findStepsByTask(1).then(res => {
                expect(res[0]).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        is_required: expect.any(Boolean),
                        tasks_id: expect.any(Number),
                        steps_description: expect.any(String),
                        number: expect.any(Number)
                    })
                )
                done()
            })
        })
        it("should be ordered by number},", done => {
            findStepsByTask(1).then(res => {
                expect(res[0].number).toBe(1)
                expect(res[1].number).toBe(2)
                expect(res[2].number).toBe(3)
                done()
            })
        })
        it("should have this object as it's first element: { id: 1, number: 1, steps_description: 'Requirement 1 step 1' is_required: true, tasks_id: 1 },", done => {
            findStepsByTask(1).then(res => {
                expect(res[0]).toEqual({
                    id: 1,
                    number: 1,
                    steps_description: "Requirement 1 step 1",
                    is_required: true,
                    tasks_id: 1
                })
                done()
            })
        })
    })

    describe("getFormattedSteps", () => {
        it("should return an array of objects", done => {
            getFormattedSteps(1, 1).then(res => {
                expect(res).toEqual(expect.any(Array))
                expect(res).toContainEqual(expect.any(Object))
                done()
            })
        })
        it("should return an array of objects with shape: {id (int), number (int), is_required (bool), tasks_id (int), is_complete (bool)} ", done => {
            getFormattedSteps(1, 1).then(res => {
                expect(res[0]).toEqual(
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
        it("should have this object as it's first element: { number: 1, steps_description: 'Requirement 1 step 1', is_required: true, tasks_id: 1, is_complete: true },", done => {
            getFormattedSteps(1, 1).then(res => {
                expect(res[0]).toEqual({
                    ...fakeSteps[0],
                    id: 1,
                    is_complete: true
                })
                done()
            })
        })
    })
})
