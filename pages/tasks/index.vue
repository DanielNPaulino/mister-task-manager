<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-900">My Tasks</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Task Form -->
      <div class="lg:col-span-1">
        <TaskForm />
      </div>

      <!-- Right Column: Task List and Filters -->
      <div class="lg:col-span-2">
        <TaskFilters 
            :status="statusFilter" 
            :priority="priorityFilter"
            @update:status="statusFilter = $event" 
            @update:priority="priorityFilter = $event"
        />

        <div v-if="taskStore.isLoading" class="text-center py-10">
            <p class="text-gray-500 dark:text-gray-400">Loading tasks...</p>
        </div>

        <div v-else-if="filteredTasks.length === 0" class="text-center py-10 bg-white dark:bg-gray-800 rounded shadow">
            <p class="text-gray-500 dark:text-gray-400">No tasks found.</p>
        </div>

        <div v-else class="grid gap-4">
          <TaskCard 
            v-for="task in filteredTasks" 
            :key="task.id" 
            :task="task" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task.store'

definePageMeta({
  middleware: 'auth'
})

const taskStore = useTaskStore()
const statusFilter = ref('all')
const priorityFilter = ref('all')

onMounted(() => {
    taskStore.fetchTasks()
})

const filteredTasks = computed(() => {
    return taskStore.tasks.filter(task => {
        const statusMatch = statusFilter.value === 'all' || task.status === statusFilter.value
        const priorityMatch = priorityFilter.value === 'all' || task.priority === priorityFilter.value
        return statusMatch && priorityMatch
    })
})
</script>
