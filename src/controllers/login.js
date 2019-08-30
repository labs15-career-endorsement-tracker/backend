const { compare } = require("bcryptjs")
const { Unauthorized } = require("http-errors")

const { findUsersBy } = require("../model")
const { generateJwt } = require("../utils")
const { validateEmail, validatePassword } = require("../middleware")

const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await findUsersBy({ email }).first()
        const error401 = Unauthorized(`Incorrect credentials`)

        if (!user) throw error401

        const isCorrectPassword = await compare(password, user.password)

        if (!isCorrectPassword) throw error401

        const userId = user.id
        const isAdmin = user.is_admin
        res.json({ token: generateJwt({ userId, isAdmin }), userId })
    } catch (error) {
        next(error)
    }
}

module.exports = [validateEmail, validatePassword, login]
