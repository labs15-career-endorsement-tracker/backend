const { Forbidden, NotFound } = require("http-errors")
const {
    findUsersBy,
    getRequirementsWithProgressAndResources,
    findUserNoPassword
} = require("../model")

const getRequirementsById = async (req, res, next) => {
    const coachId = res.locals.userId
    const { userId } = req.params

    try {
        const [coach] = await findUsersBy({ id: coachId })

        if (!coach.is_admin)
            return next(
                Forbidden(`You must be a coach to access this resource.`)
            )

        const user = await findUserNoPassword(userId)
        if (!user)
            return next(NotFound(`A student for that userId does not exist`))
        const requirements = await getRequirementsWithProgressAndResources(
            userId,
            user.tracks_id
        )

        res.json(requirements)
    } catch (error) {
        next(error)
    }
}

module.exports = [getRequirementsById]
