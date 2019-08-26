const { Router } = require("express")

const {
    getUsers,
    login,
    viewEndorsementRequirements
} = require("../controllers")

const { requiresAuth } = require("../middleware")

const api = Router()

api.get("/users", requiresAuth, getUsers)

api.post("/login", login)

api.get("/view-requirements", requiresAuth, viewEndorsementRequirements)

module.exports = api
