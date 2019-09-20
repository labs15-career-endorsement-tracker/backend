const db = require("../../data")

const getPinnedStudents = coachId => {
    return db("pinned_students as p_s")
            .where("users.id", Number(coachId))
            .join("users", "users.id", "p_s.coach_id")
            // .join("users", "users.id", "p_s.student_id")
}

const coachPinStudent = (coachId, studentId) => {
    return db("pinned_students")
            .insert({ coach_id: Number(coachId), student_id: Number(studentId) })
            .returning(["id"])
}

const coachUnpinStudent = (coachId, studentId) => {
    return db("pinned_students")
        .where({ coach_id: coachId, student_id: studentId })
        .del()
}

module.exports = { 
    coachPinStudent,
    coachUnpinStudent,
    getPinnedStudents
}