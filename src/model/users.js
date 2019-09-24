const { hash } = require("bcryptjs")
const knex = require("knex")

const db = require("../../data")
const { findRequirementsByTrack } = require("./requirements")
const { findStepsByTask } = require("./steps")
const { findCompletedRequirementStepsByUser } = require("./completedSteps")

const searchUsers = queryString => {
    if (!queryString) return Promise.resolve([])

    const formattedQs = queryString.replace(/\s/, ":* & ") + ":*"

    return db("users")
        .select("first_name", "last_name", "email", "tracks_id", "id")
        .whereRaw("full_text_weighted @@ to_tsquery('simple', ?)", formattedQs)
        .orderByRaw(
            "ts_rank(full_text_weighted, to_tsquery('simple', ?)) ASC",
            formattedQs
        )
}

const findUsers = () =>
    db("users").select(
        "id",
        "first_name",
        "last_name",
        "email",
        "tracks_id",
        "is_admin",
        "calendly_link"
    )

const findUsersBy = filter => db("users").where(filter)

const findUserNoPassword = userId => {
    return db("users")
        .where({ "users.id": userId })
        .leftJoin("tracks", "tracks.id", "users.tracks_id")
        .select(
            "first_name",
            "last_name",
            "email",
            "tracks_id",
            "is_admin",
            "tracks.title as tracks_title",
            "users.id",
            "calendly_link"
        )
        .first()
}

const getProgress = async user => {
    const allSteps = []
    const requirements = await findRequirementsByTrack(user.tracks_id)
    for (requirement of requirements) {
        const steps = await findStepsByTask(requirement.id)
        allSteps.push(...steps)
    }
    const completedSteps = await findCompletedRequirementStepsByUser(user.id)
    const progress = Math.round((completedSteps.length / allSteps.length) * 100)
    return progress
}

const getUserWithProgress = async userId => {
    const user = await findUserNoPassword(userId)
    const progress = await getProgress(user)
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

const userUpdate = async (id, userData) => {
    if (userData.password) {
        const password = await hash(userData.password, 10)
        userData.password = password
    }
    return db("users")
        .where("id", id)
        .update(userData)
}

const deleteUserById = async id => {
    return db("users")
        .where("id", id)
        .del()
}

module.exports = {
    searchUsers,
    findUsers,
    findUsersBy,
    insertUser,
    findUserNoPassword,
    getUserWithProgress,
    userUpdate,
    deleteUserById,
    getProgress
}
