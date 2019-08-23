const { Router } = require("express")

const { getUsers, login } = require("../controllers")

const { checkEmailPasswordExist } = require("../middleware")

const api = Router()

api.get("/users", getUsers)

api.post("/login", checkEmailPasswordExist, login)

module.exports = api
