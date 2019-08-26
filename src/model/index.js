const db = require("../../data")

const findUsers = () => db("users")

const findUsersBy = filter => db("users").where(filter)

const insertUser = userData =>
    db("users")
        .insert(userData)
        .returning(["id"])

module.exports = { findUsers, findUsersBy, insertUser }
