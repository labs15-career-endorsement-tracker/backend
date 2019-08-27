const db = require("../../data")
const { findAllTracks } = require("../../src/model")
const { fakeTracks } = require("../fixtures")

describe("MODEL tracks", () => {
    beforeAll(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert(fakeTracks)
        done()
    })

    afterAll(async done => {
        await db.destroy()
        done()
    })

    describe("findAllTracks", () => {
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
