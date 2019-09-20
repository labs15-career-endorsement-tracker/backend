const db = require("../../data")

const coachPinStudent = (coachId, studentId) => {
    db("pinned_students")
        .insert({coach_id: coachId, student_id: studentId})
        .returning(["id"])
}

module.exports = coachPinStudent