const { createMany, createUser } = require("../utils")

exports.seed = knex =>
    knex("users").then(() => knex("users").insert(createMany(createUser)))
