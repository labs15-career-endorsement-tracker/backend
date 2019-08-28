const { findUsers } = require("../model")

const getUsers = async (req, res, next) => {
    try {
        const users = await findUsers()
        res.json(users)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    getUsers,
    login: require("./login"),
    addUser: require("./add-user"),
    viewEndorsementRequirements: require("./viewEndorsementRequirements"),
    viewTracks: require("./tracks"),
    getSteps: require("./get-steps"),
    markSteps: require("./mark-steps")
}
