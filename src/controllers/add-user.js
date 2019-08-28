const { Conflict } = require("http-errors")

const { insertUser } = require("../model")
const {
    validateEmail,
    validatePassword,
    validateFirstName,
    validateLastName
} = require("../middleware")

const addUser = async (req, res, next) => {
    try {
        const [createdUser] = await insertUser(req.body)

        res.status(201).json({ userId: createdUser.id })
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
    addUser
]
