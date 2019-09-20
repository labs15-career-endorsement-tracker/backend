const { Forbidden } = require("http-errors")

const { searchUsers } = require("../model")

const getUsers = async (req, res, next) => {
    const { userId, isAdmin } = res.locals
    const { search } = req.query

    // if (!isAdmin)
    //     return next(Forbidden("Only coaches are allowed to access other users"))

    try {
        const users = await searchUsers(search)
        res.json(users)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = getUsers
