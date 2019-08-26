const bcrypt = require("bcryptjs")

const { findUsersBy } = require("../model")
const { generateJwt } = require("../utils")

const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await findUsersBy({ email }).first()

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateJwt({
                userId: user.id,
                isAdmin: user.is_admin
            })
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

module.exports = login
