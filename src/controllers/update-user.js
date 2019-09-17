
const { validatePassword } = require("../middleware")

const updateUser = async (req, res, next) => {
    const { password, resetToken } = req.body

    try {
        const [updatedUser] = await updatePassword(id, password)
    } catch (error) {
        next(error)
    }
}

module.exports = [
    validatePassword, 
    updateUser
]