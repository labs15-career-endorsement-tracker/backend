const { coachPinStudent } = require('../model')
const { Forbidden } = require("http-errors")

const pinStudent = async (req, res, next) => {
    const studentId = req.params.userId
    const coachId = res.locals.userId
    console.log(studentId, coachId)

    try {
        if (!res.locals.isAdmin)
            return next(Forbidden("Unauthorized content"))
        const pinnedStudent = await coachPinStudent(coachId, studentId)
        res.sendStatus(201).json(pinnedStudent)
    } catch (error) {
        next(error)
    }
}

module.exports = [pinStudent]