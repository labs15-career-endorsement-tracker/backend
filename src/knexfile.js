import { resolve as resolvePath } from "path"

import { dbUrl } from "./config"

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

export const development = {
    client: "sqlite3",
    connection: {
        filename: "./data/temp.db3"
    },
    useNullAsDefault: true,
    pool: {
        afterCreate: (conn, done) => {
            conn.run("PRAGMA foreign_keys = ON", done) // enforce FK
        }
    },
    migrations: {
        directory: "./data/migrations"
    },
    seeds: {
        directory: "./data/migrations"
    }
}
export const staging = commonConfig
export const test = commonConfig
export const production = commonConfig

export default {
    development,
    staging,
    test,
    production
}
