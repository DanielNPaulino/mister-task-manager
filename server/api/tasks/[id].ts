import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params?.id as string)
    const method = event.method

    if (method === 'PUT') {
        const body = await readBody(event)
        const index = db.tasks.findIndex((t: any) => t.id === id)

        if (index !== -1) {
            db.tasks[index] = { ...db.tasks[index], ...body }
            return db.tasks[index]
        } else {
            throw createError({ statusCode: 404, statusMessage: 'Task not found' })
        }
    }

    if (method === 'DELETE') {
        const index = db.tasks.findIndex((t: any) => t.id === id)
        if (index !== -1) {
            db.tasks.splice(index, 1)
            return { success: true }
        } else {
            throw createError({ statusCode: 404, statusMessage: 'Task not found' })
        }
    }
})
