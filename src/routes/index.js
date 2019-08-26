const { Router } = require("express")

const { getUsers, login } = require("../controllers")

const api = Router()

api.get("/users", getUsers)

api.post("/login", login)

module.exports = api
