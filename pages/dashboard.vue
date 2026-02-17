<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Summary Cards -->
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-5">
        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Tasks</dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">{{ totalTasks }}</dd>
      </div>
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-5">
        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Pending Tasks</dt>
        <dd class="mt-1 text-3xl font-semibold text-yellow-600">{{ pendingTasks }}</dd>
      </div>
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-5">
        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Completed Tasks</dt>
        <dd class="mt-1 text-3xl font-semibold text-green-600">{{ completedTasks }}</dd>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
      <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mb-4">Task Status Distribution</h3>
      <div class="relative h-64">
        <!-- Simple CSS Bar Chart as placeholder/fallback or simple implementation -->
        <div class="flex items-end justify-center h-full space-x-12">
            <div class="flex flex-col items-center">
                <div class="w-16 bg-yellow-400 rounded-t" :style="{ height: `${(pendingTasks / totalTasks) * 100}%` }"></div>
                <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">Pending</span>
            </div>
            <div class="flex flex-col items-center">
                <div class="w-16 bg-green-500 rounded-t" :style="{ height: `${(completedTasks / totalTasks) * 100}%` }"></div>
                <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">Completed</span>
            </div>
        </div>
      </div>
    </div>
    
    <div class="flex justify-end">
        <button @click="exportToCSV" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Export Tasks to CSV
        </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task.store'

definePageMeta({
  middleware: 'auth'
})

const taskStore = useTaskStore()

onMounted(() => {
    taskStore.fetchTasks()
})

const totalTasks = computed(() => taskStore.tasks.length)
const pendingTasks = computed(() => taskStore.pendingTasks.length)
const completedTasks = computed(() => taskStore.completedTasks.length)

const exportToCSV = () => {
    const headers = ['ID', 'Title', 'Description', 'Status', 'Priority', 'Created At']
    const rows = taskStore.tasks.map(t => [t.id, t.title, t.description, t.status, t.priority, t.createdAt])
    
    let csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n"
        + rows.map(e => e.join(",")).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "my_tasks.csv")
    document.body.appendChild(link) // Required for FF
    link.click()
    document.body.removeChild(link)
}
</script>
