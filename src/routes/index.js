const { Router } = require("express")

const { getUsers, login } = require("../controllers")

const { restricted } = require("../middleware")

const api = Router()

api.get("/users", restricted, getUsers)

api.post("/login", login)

module.exports = api
