const { hash } = require("bcryptjs")
const knex = require("knex")

const db = require("../../data")
const { findRequirementsByTrack } = require("./requirements")
const { findStepsByTask } = require("./steps")
const { findCompletedRequirementStepsByUser } = require("./completedSteps")

// SELECT first_name, last_name, email
// FROM public.users
// WHERE document_with_weights @@ plainto_tsquery('Mikis')
// ORDER BY ts_rank(document_with_weights, plainto_tsquery('Mikis')) desc;

const searchUsers = queryString =>
    db("users")
        .select("first_name", "last_name", "email")
        .where(
            knex.raw("document_with_weights @@ plainto_tsquery('?')", [
                queryString
            ])
        )
        .orderByRaw(
            "ts_rank(document_with_weights, plainto_tsquery('?')) desc",
            [queryString]
        )

const findUsers = () =>
    db("users").select(
        "id",
        "first_name",
        "last_name",
        "email",
        "tracks_id",
        "is_admin"
    )

const findUsersBy = filter => db("users").where(filter)

const findUserNoPassword = userId => {
    return db("users")
        .where({ "users.id": userId })
        .join("tracks", "tracks.id", "users.tracks_id")
        .select(
            "first_name",
            "last_name",
            "email",
            "tracks_id",
            "is_admin",
            "tracks.title as tracks_title",
            "users.id"
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

const userUpdate = async (id, userData) => {
    const password = await hash(userData.password, 10)
    userData.password = password
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
    deleteUserById
}
