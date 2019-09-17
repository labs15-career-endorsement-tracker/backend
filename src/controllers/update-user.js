const { userUpdate } = require("../model")

const { 
    validateEmail,
    validatePassword,
    validateFirstName,
    validateLastName,
    validateTrackId,
} = require("../middleware")

const updateUser = async (req, res, next) => {
    const { password, resetToken } = req.body
    // need to get the user to update from the token sent on req?

    try {
        const [updatedUser] = await userUpdate(id, user)
        
    } catch (error) {
        next(error)
    }
}

module.exports = [
    validateEmail,
    validatePassword,
    validateFirstName,
    validateLastName,
    validateTrackId, 
    updateUser
]