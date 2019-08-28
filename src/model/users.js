const { hash } = require("bcryptjs")

const db = require("../../data")

const findUsers = () => db("users")

const findUsersBy = filter => db("users").where(filter)

const insertUser = async userData => {
    const password = await hash(userData.password, 10)
    userData.password = password
    return db("users")
        .insert(userData)
        .returning(["id"])
}

module.exports = {
    findUsers,
    findUsersBy,
    insertUser
}
