const { hash } = require("bcryptjs")

const db = require("../../data")
const { findRequirementsByTrack } = require("./requirements")
const { findStepsByTask } = require("./steps")
const { findCompletedRequirementStepsByUser } = require("./completedSteps")

const findUsers = () => db("users")

const findUsersBy = filter => db("users").where(filter)

const findUserNoPassword = userId => {
    return db("users")
        .where({ id: userId })
        .select(
            "first_name",
            "last_name",
            "email",
            "tracks_id",
            "is_admin",
            "id"
        )
        .first()
}

const getUserWithProgress = async userId => {
    const user = await findUserNoPassword(userId)
    const requirements = await findRequirementsByTrack(user.tracks_id)
    const allSteps = []
    for (requirement of requirements) {
        const steps = await findStepsByTask(requirement.id)
        allSteps.push(...steps)
    }
    const completedSteps = await findCompletedRequirementStepsByUser(userId)
    const progress = Math.round((completedSteps.length / allSteps.length) * 100)
    return {
        ...user,
        progress
    }
}

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
    insertUser,
    findUserNoPassword,
    getUserWithProgress
}
