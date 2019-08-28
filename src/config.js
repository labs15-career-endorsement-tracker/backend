const { resolve: resolvePath } = require("path")
const { version } = require("../package.json")

require("dotenv").config({
    path: resolvePath(__dirname, "../.env")
})

const {
    NODE_ENV,
    DATABASE_URL,
    TEST_DATABASE_URL,
    PORT,
    JWT_SECRET
} = process.env

const environment = NODE_ENV || "development"
const isTesting = environment === "test"
const dbUrl = isTesting ? TEST_DATABASE_URL : DATABASE_URL
const port = PORT || 5000

module.exports = {
    environment,
    isTesting,
    dbUrl,
    port,
    version: version.split(".")[0],
    jwtSecret: JWT_SECRET
}
