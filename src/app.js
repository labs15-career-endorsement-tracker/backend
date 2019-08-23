const express = require("express")
const { json: jsonParser } = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")

const { version } = require("./config")
const { handle404, handle500 } = require("./middleware")
const router = require("./routes")

const app = express()

app.use(helmet())
app.use(jsonParser())
app.use(cors())
app.use(morgan("dev"))

app.use(`/api/v${version}`, router)
app.get("/", (_req, res) => {
    res.send(`
        <h1>Welcome to the Lambda Career Endorsement API!</h1>
        <em>v${version}</em>

        <p>API Documention is coming soon!</p>
    `)
})

app.use(handle404)
app.use(handle500)

module.exports = app
