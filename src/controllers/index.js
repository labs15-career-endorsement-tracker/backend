const { getStudents, pinStudent } = require("./pin-student")

module.exports = {
    getUsers: require("./get-users"),
    login: require("./login"),
    addUser: require("./add-user"),
    updateUser: require("./update-user"),
    viewEndorsementRequirements: require("./viewEndorsementRequirements"),
    viewTracks: require("./tracks"),
    getSteps: require("./get-steps"),
    markSteps: require("./mark-steps"),
    getAllProgressForUser: require("./get-all-progress"),
    resetPassword: require("./reset-password"),
    deleteUser: require("./delete-user"),
    getStudents,
    pinStudent,
    getReqsForUser: require("./get-reqs-for-user")
}
