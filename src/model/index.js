const db = require("../../data")
const {
    findRequirementsByTrack,
    getRequirementsWithProgress
} = require("./requirements")

const { findCompletedStepsBy, findStepsByTask } = require("./steps")

const findUsers = () => db("users")

const findUsersBy = filter => db("users").where(filter)

module.exports = {
    findUsers,
    findUsersBy,
    findRequirementsByTrack,
    getRequirementsWithProgress
}
