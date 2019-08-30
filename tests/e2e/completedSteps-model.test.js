const db = require("../../data")
const {
    markComplete,
    markIncomplete,
    findCompletedStepsBy,
    findStepsByTask,
    findCompletedRequirementStepsByUser
} = require("../../src/model")
const {
    fakeUsers,
    fakeTasks,
    fakeSteps,
    fakeTasksTracks,
    fakeTracks,
    fakeCompletedSteps
} = require("../fixtures")

describe("MODEL completed steps", () => {
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
    beforeEach(async done => {
        done()
    })
    afterAll(async done => {
        await db.destroy()
        done()
    })
    describe("findCompletedStepsBy", () => {
        it("should return an array of objects", done => {
            findCompletedStepsBy({ user_id: 1 }).then(res => {
                expect(res).toEqual(expect.any(Array))
                expect(res).toContainEqual(expect.any(Object))
                done()
            })
        })
        it("should return an array of objects with shape: {id (int), user_id (int), steps_id (bool), created_at (String)} ", done => {
            findCompletedStepsBy({ user_id: 1 }).then(res => {
                expect(res[0]).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        user_id: expect.any(Number),
                        steps_id: expect.any(Number),
                        created_at: expect.any(Date)
                    })
                )
                done()
            })
        })
        it("should have this object as it's first element: { user_id: 1, steps_id: 1 },", done => {
            findCompletedStepsBy({ user_id: 1 }).then(res => {
                expect(res[0]).toEqual({ ...fakeCompletedSteps[0], id: 1 })
                done()
            })
        })
        it("should have have 3 elements,", done => {
            findCompletedStepsBy({ user_id: 1 }).then(res => {
                expect(res.length).toBe(3)
                done()
            })
        })
        it("should return an empty array when you look up a user that does not exist,", done => {
            findCompletedStepsBy({ user_id: 1000 }).then(res => {
                expect(res).toEqual([])
                expect(res.length).toBe(0)
                done()
            })
        })
    })
    describe("findCompletedRequirementStepsByUser", () => {
        it("should return an array of objects", done => {
            findCompletedRequirementStepsByUser(1).then(res => {
                expect(res).toEqual(expect.any(Array))
                expect(res).toContainEqual(expect.any(Object))
                done()
            })
        })
        it("should return an array of objects with shape: {id (int), user_id (int), steps_id (bool), created_at (String)} ", done => {
            findCompletedRequirementStepsByUser(1).then(res => {
                expect(res[0]).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        user_id: expect.any(Number),
                        steps_id: expect.any(Number),
                        created_at: expect.any(Date)
                    })
                )
                done()
            })
        })
        it("should have this object as it's first element: { user_id: 1, steps_id: 1 },", done => {
            findCompletedRequirementStepsByUser(1).then(res => {
                expect(res[0]).toEqual({ ...fakeCompletedSteps[0], id: 1 })
                done()
            })
        })
        it("should have have 2 elements,", done => {
            findCompletedRequirementStepsByUser(1).then(res => {
                expect(res.length).toBe(2)
                done()
            })
        })
        it("should return an empty array when you look up a user that does not exist,", done => {
            findCompletedRequirementStepsByUser(1000).then(res => {
                expect(res).toEqual([])
                expect(res.length).toBe(0)
                done()
            })
        })
    })
    describe("markComplete", () => {
        it("should return an array with an object", done => {
            markComplete(1, 3).then(res => {
                expect(res).toEqual(expect.any(Array))
                expect(res).toContainEqual(expect.any(Object))
                done()
            })
        })
        it("should persist the new entry in the database", done => {
            findCompletedStepsBy({ user_id: 1, steps_id: 3 }).then(res => {
                expect(res[0]).toEqual(
                    expect.objectContaining({
                        id: 4,
                        user_id: 1,
                        steps_id: 3,
                        created_at: expect.any(Date)
                    })
                )
                done()
            })
        })
        it("should not allow duplicate entry: expect code 23505", done => {
            markComplete(1, 1)
                .then(res => {
                    done()
                })
                .catch(err => {
                    expect(err.code).toBe("23505")
                    done()
                })
        })
        it("should not allow entry of users or steps that do not exist: expect code 23503", done => {
            markComplete(10, 10)
                .then(res => {
                    done()
                })
                .catch(err => {
                    expect(err.code).toBe("23503")
                    done()
                })
        })
    })
    describe("markIncomplete", () => {
        it("should return the number 1 on successful delete, meaning 1 entry has been deleted", done => {
            markIncomplete(1, 3).then(res => {
                expect(res).toBe(1)
                done()
            })
        })
        it("should return the number 0 on unsuccessful delete, meaning 0 entries have been deleted", done => {
            // entry at 1, 3 does not exist because we deleted it in teh test above
            markIncomplete(1, 3).then(res => {
                expect(res).toBe(0)
                done()
            })
        })
        it("should remove the entry from the database", done => {
            findCompletedStepsBy({ user_id: 1, steps_id: 3 }).then(res => {
                expect(res).toEqual([])
                done()
            })
        })
        it("should not remove any other entries from the db", done => {
            findCompletedStepsBy({ user_id: 1 }).then(res => {
                expect(res.length).toBe(3)
            })

            findStepsByTask(1).then(steps => {
                expect(steps.length).toBe(3)
                done()
            })
        })
    })
})
