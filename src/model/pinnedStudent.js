const db = require("../../data")
const { getProgress } = require("./users")

const getPinnedStudents = async coachId => {
    const students = await db("pinned_students as p_s")
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
    const studentsWithProgress = await Promise.all(
        students.map(async student => {
            const progress = await getProgress(student)
            return {
                ...student,
                progress
            }
        })
    )
    return studentsWithProgress
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

const getPinnedStudent = studentId => {
    return db("pinned_students")
        .where({ student_id: studentId })
        .first()
}
const isStudentPinned = async studentId => {
    const foundStudent = await getPinnedStudent(studentId)
    return foundStudent ? true : false
}

module.exports = {
    coachPinStudent,
    coachUnpinStudent,
    getPinnedStudents,
    isStudentPinned,
    getPinnedStudent
}
