const { Conflict } = require("http-errors")

const { insertUser } = require("../model")
const {
    validateEmail,
    validatePassword,
    validateFirstName,
    validateLastName,
    validateTrackId
} = require("../middleware")
const { generateJwt } = require("../utils")

const addUser = async (req, res, next) => {
    try {
        const [createdUser] = await insertUser(req.body)

        const userId = createdUser.id
        const isAdmin = createdUser.is_admin
        res.status(201).json({
            token: generateJwt({ userId, isAdmin }),
            userId
        })
    } catch (error) {
        switch (Number(error.code)) {
            case 23505:
                next(Conflict(`User already has an account`))
                break
            default:
                next(error)
        }
    }
}

module.exports = [
    validateEmail,
    validatePassword,
    validateFirstName,
    validateLastName,
    validateTrackId,
    addUser
]
