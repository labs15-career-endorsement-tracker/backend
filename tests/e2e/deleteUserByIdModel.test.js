const db = require("../../data")
const { deleteUserById, findUsersBy } = require("../../src/model")
const {
    fakeUsers,
    fakeTasks,
    fakeSteps,
    fakeTasksTracks,
    fakeTracks,
    fakeCompletedSteps,
    fakeResources
} = require("../fixtures")

describe("MODEL deleteUserById", () => {
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

    describe("deleteUser", () => {
        it("should return a 1 when the user is deleted", done => {
            deleteUserById(1).then(res => {
                expect(res).toBe(1)
                done()
            })
        })
        it("should return a 0 when the user is not deleted", done => {
            deleteUserById(2).then(res => {
                expect(res).toBe(0)
                done()
            })
        })
        it("should remove the user from the database", done => {
            findUsersBy({ id: 1 }).then(res => {
                expect(res).toEqual([])
                done()
            })
        })
    })
})
