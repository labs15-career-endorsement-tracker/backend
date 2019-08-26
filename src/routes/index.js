const { Router } = require("express")

const { getUsers, login } = require("../controllers")

const { auth } = require("../middleware")

const api = Router()

api.get("/users", auth, getUsers)

api.post("/login", login)

module.exports = api
