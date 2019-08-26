const db = require("../../data")

const findUsers = () => db("users")

const findUsersBy = filter => db("users").where(filter)

module.exports = { findUsers, findUsersBy }
