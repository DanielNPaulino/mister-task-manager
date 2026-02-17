import { db } from '../../db'

export default defineEventHandler(async (event) => {
    const method = event.method

    if (method === 'GET') {
        return db.tasks
    }

    if (method === 'POST') {
        const body = await readBody(event)
        const newTask = {
            id: Date.now(),
            title: body.title,
            description: body.description,
            status: 'pending',
            priority: body.priority || 'medium',
            createdAt: new Date().toISOString()
        }
        // @ts-ignore
        db.tasks.push(newTask)
        return newTask
    }
})
