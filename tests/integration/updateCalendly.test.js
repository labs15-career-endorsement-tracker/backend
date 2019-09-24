const db = require("../../data")
const { userUpdate } = require("../../src/model")

describe("User.userUpdate", () => {
    beforeEach(async done => {
        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("users").insert([
            {
                first_name: "Lucy",
                last_name: "Thep",
                email: "lucythep@gmail.com",
                password: "Password1234!",
                is_admin: true,
                tracks_id: null
                // calendly_link: null
            }
        ])
        done()
    })

    afterAll(async done => {
        await db.destroy()
        done()
    })

    it("updates the user's calendly_link URL to https://calendly.com/lucy_thep", done => {
        userUpdate(1, { calendly_link: "https://calendly.com/lucy_thep" })
            .then(user => {
                expect(user).toEqual(1)
                done()
            })
            .catch(error => {
                done(error)
            })
    })
})
