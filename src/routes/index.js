const { Router } = require("express")

const {
    getUsers,
    addUser,
    login,
    viewEndorsementRequirements,
    viewTracks,
    getSteps,
    markSteps
} = require("../controllers")

const { requiresAuth } = require("../middleware")

const api = Router()

api.get("/users", getUsers)
api.post("/users", addUser)

api.post("/login", login)

api.get("/requirements", requiresAuth, viewEndorsementRequirements)

api.get("/tracks", viewTracks)

api.get("/requirements/:requirementsId/steps", requiresAuth, getSteps)

api.put("/requirements/:requirementsId/steps/:stepsId", requiresAuth, markSteps)

module.exports = api
