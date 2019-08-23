const knex = require("knex")
const { environment } = require("../src/config")
const config = require("../knexfile")

module.exports = knex(config[environment])
