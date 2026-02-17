export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Mock validation
    if (!body.email || !body.password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required'
        })
    }

    // Mock authentication logic
    // In a real app, you would check against a database
    if (body.password === 'password') { // Simple mock password check
        const token = 'mock-jwt-token-' + Date.now()
        const user = {
            id: 1,
            email: body.email,
            name: 'Mock User'
        }

        // Set cookie (optional here if handled by client, but good practice to set httpOnly cookie)
        // setCookie(event, 'auth_token', token, { httpOnly: true })

        return { token, user }
    } else {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials'
        })
    }
})
