export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.email || !body.password || !body.name) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Name, email, and password are required'
        })
    }

    // Mock registration logic
    const token = 'mock-jwt-token-' + Date.now()
    const user = {
        id: Math.floor(Math.random() * 1000),
        email: body.email,
        name: body.name
    }

    return { token, user }
})
