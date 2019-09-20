const { coachPinStudent, getPinnedStudents } = require('../model')
const { Forbidden } = require("http-errors")

const getStudents = async (req, res, next) => {
    const coachId = res.locals.userId
    console.log(coachId)

    try {
        const students = await getPinnedStudents(coachId)
        res.status(200).json(students)
    } catch (error){
        console.log(error)
        next(error)
    }

}

const pinStudent = async (req, res, next) => {
    const studentId = req.params.userId
    const coachId = res.locals.userId
    console.log(studentId, coachId)

    try {
        // if (!res.locals.isAdmin)
        //     return next(Forbidden("Unauthorized content"))
        const pinnedStudent = await coachPinStudent(coachId, studentId)
        res.status(201).json(pinnedStudent)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    pinStudent,
    getStudents
}