import db from "../data"

export const getAllUsers = () => db("users")
