const db = require("../../data")
const { findAllTracks } = require("../../src/model")
const { fakeTracks } = require("../fixtures")

// const url = `/api/v${version}/view-requirements`

describe("MODEL requirements", () => {
    beforeAll(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert(fakeTracks)
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
            findAllTracks().then(res => {
                expect(res).toEqual(expect.any(Array))
                expect(res).toContainEqual(expect.any(Object))
                done()
            })
        })
        it("should return an array with one element", done => {
            findAllTracks().then(res => {
                expect(res.length).toBe(1)
                done()
            })
        })
        it("should have {'id': 1, 'title': 'Web'} as it's first element,", done => {
            findAllTracks().then(res => {
                expect(res[0]).toEqual({ id: 1, title: "Web" })
                done()
            })
        })
    })
})
