const {} = require("bcryptjs")
const {} = require("http-errors")

const { insertUser } = require("../model")
const {} = require("../utils")
const { validateEmail, validatePassword } = require("../middleware")

const addUser = async (req, res, next) => {
    try {
        const [createdUser] = await insertUser(req.body)

        res.status(201).json({ userId: createdUser.id })
    } catch (error) {
        next(error)
    }
}

module.exports = [validateEmail, validatePassword, addUser]
