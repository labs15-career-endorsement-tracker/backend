const { Router } = require("express")

const {
    getUsers,
    addUser,
    updateUser,
    updateCalendly,
    login,
    viewEndorsementRequirements,
    viewTracks,
    getSteps,
    markSteps,
    getAllProgressForUser,
    resetPassword,
    deleteUser,
    getStudents,
    pinStudent
} = require("../controllers")

const { requiresAuth } = require("../middleware")

const api = Router()

api.get("/users", requiresAuth, getUsers)

api.post("/users", addUser)

api.put("/users", requiresAuth, updateUser)

api.put("/users/update-calendly-link", requiresAuth, updateCalendly)

api.get("/users/:userId", requiresAuth, getAllProgressForUser)

api.post("/login", login)

api.post("/reset-password", resetPassword)

api.get("/requirements", requiresAuth, viewEndorsementRequirements)

api.get("/tracks", viewTracks)

api.get("/requirements/:requirementsId/steps", requiresAuth, getSteps)

api.put("/requirements/:requirementsId/steps/:stepsId", requiresAuth, markSteps)

api.delete("/users", requiresAuth, deleteUser)

api.get("/students", requiresAuth, getStudents)

api.put("/students/:userId", requiresAuth, pinStudent)

module.exports = api
