const { NotFound } = require("http-errors")

const { deleteUserById } = require("../model")

const deleteUser = async (req, res, next) => {
    const { userId } = res.locals
    try {
        const deleted = await deleteUserById(userId)
        if (deleted) {
            res.sendStatus(200)
        } else {
            throw NotFound("We could not delete a user that does not exist")
        }
    } catch (error) {
        next(error)
    }
}

module.exports = [deleteUser]
