import { defineStore } from 'pinia'

export interface Task {
    id: number
    title: string
    description: string
    status: 'pending' | 'completed'
    priority?: 'low' | 'medium' | 'high'
    createdAt: string
}

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [] as Task[],
        isLoading: false
    }),
    actions: {
        async fetchTasks() {
            this.isLoading = true
            try {
                const { data } = await useFetch<Task[]>('/api/tasks')
                if (data.value) {
                    this.tasks = data.value
                }
            } catch (error) {
                console.error('Failed to fetch tasks', error)
            } finally {
                this.isLoading = false
            }
        },
        async addTask(task: Partial<Task>) {
            try {
                const { data } = await useFetch<Task>('/api/tasks', {
                    method: 'POST',
                    body: task
                })
                if (data.value) {
                    this.tasks.push(data.value)
                }
            } catch (error) {
                console.error('Failed to add task', error)
            }
        },
        async updateTask(id: number, updates: Partial<Task>) {
            try {
                const { data } = await useFetch<Task>(`/api/tasks/${id}`, {
                    method: 'PUT',
                    body: updates
                })
                if (data.value) {
                    const index = this.tasks.findIndex(t => t.id === id)
                    if (index !== -1) {
                        this.tasks[index] = data.value
                    }
                }
            } catch (error) {
                console.error('Failed to update task', error)
            }
        },
        async deleteTask(id: number) {
            try {
                await useFetch(`/api/tasks/${id}`, {
                    method: 'DELETE'
                })
                this.tasks = this.tasks.filter(t => t.id !== id)
            } catch (error) {
                console.error('Failed to delete task', error)
            }
        }
    },
    getters: {
        pendingTasks: (state) => state.tasks.filter(t => t.status === 'pending'),
        completedTasks: (state) => state.tasks.filter(t => t.status === 'completed')
    }
})
