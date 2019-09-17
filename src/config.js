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
    AUTH_JWT_SECRET,
    EMAIL_JWT_SECRET,
    EMAIL_ADDRESS_SENDER,
    EMAIL_ADDRESS_PASSWORD,
    EMAIL_URL_RESET_PASSWORD
} = process.env

const environment = NODE_ENV || "development"
const isTesting = environment === "test"
const isProduction = environment === "production"
const dbUrl = isTesting ? TEST_DATABASE_URL : DATABASE_URL
const port = PORT || 5000

module.exports = {
    environment,
    isTesting,
    isProduction,
    dbUrl,
    port,
    version: version.split(".")[0],
    jwtSecret: AUTH_JWT_SECRET,
    emailConfig: {
        secret: EMAIL_JWT_SECRET,
        sender: EMAIL_ADDRESS_SENDER,
        password: EMAIL_ADDRESS_PASSWORD,
        resetPasswordUrl: EMAIL_URL_RESET_PASSWORD
    }
}
