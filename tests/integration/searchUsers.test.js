const { name, internet } = require("faker")

const db = require("../../data")
const { createMany } = require("../../data/utils")
const { searchUsers } = require("../../src/model/users")

const createUser = () => {
    const first_name = name.firstName()
    const last_name = name.lastName()
    return {
        first_name,
        last_name,
        email: internet.email(first_name, last_name).toLowerCase(),
        password: "Password1234!",
        tracks_id: 1
    }
}

const createCustomUser = (index, first_name, last_name) => {
    return {
        first_name,
        last_name,
        email: internet.email(first_name).toLowerCase(),
        password: "Password1234!",
        tracks_id: 1
    }
}

describe("User.searchUsers", () => {
    let users

    beforeEach(async done => {
        users = createMany(createUser, 100)
        users[14] = createCustomUser(14, "Jabroniguy", "ManDude")
        users[99] = createCustomUser(99, "Jabroniguy", "WomanDude")
        users[65] = createCustomUser(65, "Jabroniguy", "DogDude")
        users[3] = createCustomUser(3, "Jabroniguy", "CatDude")
        users[27] = createCustomUser(27, "Jabroniguy", "PenguinDude")

        await db.migrate.rollback(null, true)
        await db.migrate.latest()
        await db("tracks").insert({ title: "Web Development" })
        await db("users").insert(users)
        done()
    })

    afterAll(async done => {
        await db.destroy()
        done()
    })

    it("finds the Jabroniguy", done => {
        searchUsers("Jabroniguy")
            .then(users => {
                expect(users).toHaveLength(5)
                done()
            })
            .catch(error => {
                done(error)
            })
    })

    it("returns an empty array when there is no query string", done => {
        searchUsers()
            .then(users => {
                expect(users).toHaveLength(0)
                done()
            })
            .catch(error => {
                done(error)
            })
    })

    it("returns a 'Jabroniguy' when search query is 'Ja'", done => {
        searchUsers("Ja")
            .then(users => {
                expect(users.length).toBeGreaterThanOrEqual(5)
                done()
            })
            .catch(error => {
                done(error)
            })
    })

    it("returns a 'Jabroni Mandude' when search query is 'Ja Ma'", done => {
        searchUsers("Ja Ma")
            .then(users => {
                expect(users.length).toBeGreaterThanOrEqual(1)
                done()
            })
            .catch(error => {
                done(error)
            })
    })
})
