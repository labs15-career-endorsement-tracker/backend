import express from "express"
import { json as jsonParser } from "body-parser"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"

import { version } from "./config"
import { handle404, handle500 } from "./middleware"
import router from "./routes"

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

export default app
