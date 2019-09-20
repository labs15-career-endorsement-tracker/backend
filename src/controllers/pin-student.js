const { coachPinStudent } = require('../model')

const pinStudent = async (req, res, next) => {
    const studentId = req.params.userId
    const coachId = res.locals.userId

    try {
        await coachPinStudent(coachId, studentId)
        res.setStatus(200)
    } catch (error) {
        next(error)
    }

}

module.exports = [pinStudent]