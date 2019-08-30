const { name, internet, random } = require("faker")
const bcrypt = require("bcryptjs")

const { fakeUsers } = require("../../tests/fixtures")
const maxRecords = 1000

const fakeCoaches = [
    {
        first_name: "Alan",
        last_name: "Turing",
        email: "a_turing@gmail.com",
        password: bcrypt.hashSync("Password1234!", 4),
        is_admin: true,
        tracks_id: 6
    },
    {
        first_name: "Grace",
        last_name: "Hopper",
        email: "g_hopper@gmail.com",
        password: bcrypt.hashSync("Password1234!", 4),
        is_admin: true,
        tracks_id: 6
    },
    {
        first_name: "Ada",
        last_name: "Lovelace",
        email: "a_lovelace@gmail.com",
        password: bcrypt.hashSync("Password1234!", 4),
        is_admin: true,
        tracks_id: 6
    }
]
const createMany = (factory, count = maxRecords) => {
    const many = []
    // we want to seed a couple static users and coaches for static login creds
    many.push(...fakeUsers)
    for (let index = 0; index < count; index++) {
        many.push(factory())
    }
    return many
}
const tracks = [1, 2, 3, 4, 5]
const createUser = () => {
    const first_name = name.firstName()
    const last_name = name.lastName()
    return {
        first_name,
        last_name,
        email: internet.email(first_name, last_name).toLowerCase(),
        password: bcrypt.hashSync("Password1234!", 4),
        tracks_id: random.arrayElement(tracks)
    }
}

module.exports = { createMany, createUser }
