const bcrypt = require("bcryptjs")
const { findUsersBy } = require("../model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await findUsersBy({ email }).first()
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user)
            res.status(200).json({
                message: `Welcome ${user.first_name}, you are logged in`,
                token
            })
        } else {
            res.status(401).json({
                errorMessage: "That email or password is not correct."
            })
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

function generateToken(user) {
    const payload = {
        subject: user.id,
        email: user.email,
        is_admin: user.is_admin
    }
    const options = {
        expiresIn: "1d"
    }
    const secret = process.env.JWT_SECRET
    return jwt.sign(payload, secret, options)
}

module.exports = login
