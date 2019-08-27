const { Router } = require("express")

const {
    getUsers,
    login,
    viewEndorsementRequirements,
    viewTracks
} = require("../controllers")

const { requiresAuth } = require("../middleware")

const api = Router()

api.get("/users", getUsers)

api.post("/login", login)

api.get("/requirements", requiresAuth, viewEndorsementRequirements)

api.get("/tracks", requiresAuth, viewTracks)

module.exports = api
