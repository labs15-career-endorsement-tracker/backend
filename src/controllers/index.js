import { findUsers } from "../model"

export const getUsers = async (req, res, next) => {
    try {
        const users = await findUsers()
        res.json(users)
    } catch (error) {
        console.log(error)
        next(error)
    }
}
