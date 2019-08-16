import { Router } from "express"
import {} from "http-errors"

import { getUsers } from "../controllers"

const api = Router()

api.get("/users", getUsers)

export default api
