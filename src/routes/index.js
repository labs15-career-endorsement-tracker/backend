const { Router } = require("express")
// What's this doing???
// import {} from "http-errors"

const { getUsers } = require("../controllers")

const api = Router()

api.get("/users", getUsers)

module.exports = api
