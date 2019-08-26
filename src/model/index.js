const db = require("../../data")

const findUsers = () => db("users")

const findUsersBy = filter => db("users").where(filter)

const findTasksBy = filter => db("tasks").where(filter)

module.exports = { findUsers, findUsersBy, findTasksBy }
