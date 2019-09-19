const { findUsers } = require("../model")

const getUsers = async (req, res, next) => {
    const searchStr = req.body.searchStr
    console.log(searchStr)
    try {
        const users = await findUsers(searchStr)
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
    updateUser: require("./update-user"),
    viewEndorsementRequirements: require("./viewEndorsementRequirements"),
    viewTracks: require("./tracks"),
    getSteps: require("./get-steps"),
    markSteps: require("./mark-steps"),
    getAllProgressForUser: require("./get-all-progress"),
    resetPassword: require("./reset-password"),
    deleteUser: require("./delete-user")
}
