const { hash } = require("bcryptjs")
const knex = require("knex")

const db = require("../../data")

const { getPinnedStudent } = require("./pinnedStudent")
const { getProgress } = require("./progress")

// Get the user object without the password property
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

const searchUsers = async queryString => {
    if (!queryString) return Promise.resolve([])

    const formattedQs = queryString.replace(/\s/, ":* & ") + ":*"

    const students = await db("users")
        .select("first_name", "last_name", "email", "tracks_id", "id")
        .whereRaw("full_text_weighted @@ to_tsquery('simple', ?)", formattedQs)
        .orderByRaw(
            "ts_rank(full_text_weighted, to_tsquery('simple', ?)) ASC",
            formattedQs
        )
    const studentsWithPinnedFlag = await Promise.all(
        students.map(async student => {
            const pinnedStudent = await getPinnedStudent(student.id)
            if (pinnedStudent) {
                let coach = await findUserNoPassword(pinnedStudent.coach_id)
                return {
                    ...student,
                    isPinnedBy: `${coach.first_name} ${coach.last_name}`
                }
            }
            return {
                ...student,
                isPinnedBy: null
            }
        })
    )
    return studentsWithPinnedFlag
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

const getUserWithProgress = async userId => {
    const user = await findUserNoPassword(userId)
    const progress = await getProgress(user)
    const pinnedStudent = await getPinnedStudent(userId)
    let coach = null
    if (pinnedStudent) {
        coach = await findUserNoPassword(pinnedStudent.coach_id)
    }
    return {
        ...user,
        progress,
        coach
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
    deleteUserById
}
