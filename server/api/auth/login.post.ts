import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Mock validation
    if (!body.email || !body.password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required'
        })
    }

    // Verify credentials
    // @ts-ignore
    const user = db.users.find((u: any) => u.email === body.email)

    if (user && user.password === body.password) {
        const token = 'mock-jwt-token-' + user.id

        // Return user without password
        const { password, ...userWithoutPassword } = user

        return { token, user: userWithoutPassword }
    } else {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials'
        })
    }
})
