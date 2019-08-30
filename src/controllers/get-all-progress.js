const { getUserWithProgress, findUserNoPassword } = require("../model")
const { Unauthorized } = require("http-errors")

const getAllProgressForUser = async (req, res, next) => {
    const userId = parseInt(req.params.userId)
    try {
        // if the user looking up the records does not match the user they are searching for, and they are not a coach, throw unauthorized
        if (userId !== res.locals.userId && !res.locals.isAdmin)
            throw Unauthorized("Unauthorized content")
        const userProgress = await getUserWithProgress(userId)
        res.json(userProgress)
    } catch (error) {
        next(error)
    }
}

module.exports = [getAllProgressForUser]
