const { Router } = require("express")

const { getUsers } = require("../controllers")

const api = Router()

api.get("/users", getUsers)

module.exports = api
