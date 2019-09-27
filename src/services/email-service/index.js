const path = require("path")

const nodemailer = require("nodemailer")
const Email = require("email-templates")

const { emailConfig, isProduction, isStaging } = require("../../config")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: emailConfig.sender,
        pass: emailConfig.password
    }
})

const email = new Email({
    message: { from: emailConfig.sender },
    send: isProduction || isStaging,
    transport: transporter
})

module.exports = (toEmail, data) => {
    return email.send({
        template: path.resolve(__dirname, "templates", "reset-password"),
        message: { to: toEmail },
        locals: data
    })
}
