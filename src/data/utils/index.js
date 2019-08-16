import { name, internet, random } from "faker"

const maxRecords = 1000

const createMany = (factory, count = maxRecords) => {
    const many = []
    for (let index = 0; index < count; index++) {
        many.push(factory())
    }
    return many
}
const tracks = ["Full-Stack Web", "iOS", "Data Science", "Android", "UX Design"]
const createUser = () => {
    const first_name = name.firstName()
    const last_name = name.lastName()
    return {
        first_name,
        last_name,
        email: internet.email(first_name, last_name),
        password: internet.password(16, true),
        track: random.arrayElement(tracks)
    }
}

export { createMany, createUser }
