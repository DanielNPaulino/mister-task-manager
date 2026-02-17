export const db = {
    tasks: [
        {
            id: 1,
            title: 'Welcome Task',
            description: 'This is your first task',
            status: 'pending',
            priority: 'medium',
            createdAt: new Date().toISOString()
        }
    ],
    users: [] as any[]
}
