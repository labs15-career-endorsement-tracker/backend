const { getUserWithProgress, findUserNoPassword } = require("../model")
const { Unauthorized } = require("http-errors")

const getAllProgressForUser = async (req, res, next) => {
    const userId = parseInt(req.params.userId)
    try {
        const user = await findUserNoPassword(res.locals.userId)
        // if the user looking up the records does not match the user they are searching for, and they are not a coach, throw unauthorized
        if (userId !== res.locals.userId && !user.is_admin)
            throw Unauthorized("Unauthorized content")
        const userProgress = await getUserWithProgress(userId, 10)
        res.json(userProgress)
    } catch (error) {
        next(error)
    }
}

module.exports = [getAllProgressForUser]
