const { Router } = require("express")

const { getUsers, login } = require("../controllers")

const { requiresAuth } = require("../middleware")

const api = Router()

api.get("/users", requiresAuth, getUsers)

api.post("/login", login)

module.exports = api
