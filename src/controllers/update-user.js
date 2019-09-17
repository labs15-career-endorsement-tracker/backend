const { userUpdate } = require("../model")

const { 
    validatePassword
} = require("../middleware")

const updateUser = async (req, res, next) => {
    const { password } = req.body
    const id = res.locals.userId

    try {
        await userUpdate(id, {password})
        res.sendStatus(200)
        
    } catch (error) {
        next(error)
    }
}

module.exports = [
    validatePassword,
    updateUser
]