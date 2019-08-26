const { Router } = require("express")

const { getUsers, addUser, login } = require("../controllers")

const api = Router()

api.get("/users", getUsers)
api.post("/users", addUser)

api.post("/login", login)

module.exports = api
