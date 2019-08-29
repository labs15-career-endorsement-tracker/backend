const { name, internet, random } = require("faker")
const bcrypt = require("bcryptjs")

const { fakeUsers, fakeCoaches } = require("../../tests/fixtures")
const maxRecords = 1000

const createMany = (factory, count = maxRecords) => {
    const many = []
    // we want to seed a couple static users and coaches for static login creds
    many.push(...fakeUsers, ...fakeCoaches)
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
