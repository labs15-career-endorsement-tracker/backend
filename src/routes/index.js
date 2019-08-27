const { Router } = require("express")

const {
    getUsers,
    login,
    viewEndorsementRequirements
} = require("../controllers")

const { requiresAuth } = require("../middleware")

const api = Router()

api.get("/users", getUsers)

api.post("/login", login)

api.get("/requirements", requiresAuth, viewEndorsementRequirements)

module.exports = api
