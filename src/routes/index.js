const { Router } = require("express")

const {
    getUsers,
    login,
    viewEndorsementRequirements
} = require("../controllers")

const api = Router()

api.get("/users", getUsers)

api.post("/login", login)

api.get("/view-endorsement-requirements")

module.exports = api
