const knex = require("knex")
const environment = require("../config")
const config = require("../knexfile")

module.exports = knex(config[environment])
