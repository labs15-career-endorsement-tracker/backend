const db = require("../../data")

const getPinnedStudents = coachId => {
    return db("pinned_students as p_s")
        .where("coach_id", Number(coachId))
        .join("users", "users.id", "p_s.student_id")
        .select(
            "users.id",
            "users.first_name",
            "users.last_name",
            "users.email",
            "users.is_admin",
            "users.tracks_id",
            "users.calendly_link"
        )
}

const coachPinStudent = (coachId, studentId) => {
    return db("pinned_students")
            .insert({ coach_id: Number(coachId), student_id: Number(studentId) })
            .returning(["id"])
}

const coachUnpinStudent = studentId => {
    return db("pinned_students")
        .where({ student_id: studentId })
        .del()
}
const isStudentPinned = async studentId => {
    const foundStudent = await db("pinned_students")
        .where({ student_id: studentId }).first()

    return foundStudent ? true : false
}


module.exports = { 
    coachPinStudent,
    coachUnpinStudent,
    getPinnedStudents,
    isStudentPinned
}