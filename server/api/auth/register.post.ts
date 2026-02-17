import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.email || !body.password || !body.name) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Name, email, and password are required'
        })
    }

    // Check if user already exists
    // @ts-ignore
    const existingUser = db.users.find((u: any) => u.email === body.email)
    if (existingUser) {
        throw createError({
            statusCode: 409,
            statusMessage: 'User already exists'
        })
    }

    const newUser = {
        id: Date.now(),
        email: body.email,
        name: body.name,
        password: body.password // In a real app, hash this password!
    }

    // @ts-ignore
    db.users.push(newUser)

    const token = 'mock-jwt-token-' + newUser.id

    // Return user without password
    const { password, ...user } = newUser

    return { token, user }
})
