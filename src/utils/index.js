const jwt = require("jsonwebtoken")

const { jwtSecret, emailConfig } = require("../config")

const generateJwt = (payload, secret = jwtSecret, expiresIn = "1d") => {
    return jwt.sign(payload, secret, { expiresIn })
}

const extractJwt = (token, secret = jwtSecret) => {
    //    if (secret) {
    return jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            throw err
        }
        return decoded
    })
    //    } else {
    //     return jwt.verify(token, emailSecret, (err, decoded) => {
    //         if (err) {
    //             throw err
    //         } else {
    //             return decoded
    //         }
    //     })
    //    }
}
module.exports = { generateJwt, extractJwt }
