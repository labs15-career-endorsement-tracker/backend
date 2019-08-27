const db = require("../../data")
const { findRequirementsByTrack } = require("./requirements")

const { findAllTracks } = require("./tracks")

const findUsers = () => db("users")

const findUsersBy = filter => db("users").where(filter)

module.exports = {
    findUsers,
    findUsersBy,
    findRequirementsByTrack,
    findAllTracks
}
