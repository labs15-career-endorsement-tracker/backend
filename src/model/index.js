const db = require("../data")
const findUsers = () => db("users")
module.exports = findUsers
