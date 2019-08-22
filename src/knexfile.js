const { resolve: resolvePath } = require("path")

const { dbUrl } = require("./config")

const client = "postgresql"
const pool = {
    min: 2,
    max: 10
}

const migrations = {
    tableName: "knex_migrations",
    directory: resolvePath(__dirname, "./data/migrations")
}

const seeds = { directory: resolvePath(__dirname, "./data/seeds") }

const commonConfig = {
    client,
    connection: dbUrl,
    pool,
    migrations,
    seeds
}

const development = commonConfig
const staging = commonConfig
const test = commonConfig
const production = commonConfig

module.exports = {
    development,
    staging,
    test,
    production
}
