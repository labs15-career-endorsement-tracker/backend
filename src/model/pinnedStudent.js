const db = require("../../data")

const coachPinStudent = (coachId, studentId) => {
    return db("pinned_students")
            .insert({ coach_id: Number(coachId), student_id: Number(studentId) })
            .returning(["id"])
}

module.exports = { coachPinStudent }