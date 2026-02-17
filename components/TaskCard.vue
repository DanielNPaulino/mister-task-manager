<template>
  <div class="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
    <div class="p-5">
      <div class="flex items-center justify-between">
        <h3 class="text-lg leading-6 font-medium text-gray-900 truncate" :class="{ 'line-through text-gray-500': task.status === 'completed' }">
          {{ task.title }}
        </h3>
        <span 
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
          :class="task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
        >
          {{ task.status }}
        </span>
      </div>
      <p class="mt-2 text-sm text-gray-500 line-clamp-2">
        {{ task.description }}
      </p>
      <div class="mt-4 flex justify-between items-center">
        <span class="text-xs text-gray-400 capitalize">Priority: {{ task.priority }}</span>
        <div class="flex flex-wrap gap-3 mt-2 sm:mt-0">
            <button 
            @click="toggleStatus" 
            class="text-sm font-medium hover:underline focus:outline-none"
            :class="task.status === 'completed' ? 'text-yellow-600' : 'text-green-600'"
            >
            {{ task.status === 'completed' ? 'Mark Pending' : 'Mark Complete' }}
            </button>
            <NuxtLink :to="`/tasks/${task.id}`" class="text-sm text-indigo-600 hover:text-indigo-900 font-medium">View</NuxtLink>
            <button @click="deleteTask" class="text-sm text-red-600 hover:text-red-900 font-medium">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore, type Task } from '@/stores/task.store'

const props = defineProps<{
  task: Task
}>()

const taskStore = useTaskStore()

const toggleStatus = () => {
  const newStatus = props.task.status === 'completed' ? 'pending' : 'completed'
  taskStore.updateTask(props.task.id, { status: newStatus })
}

const deleteTask = () => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(props.task.id)
  }
}
</script>
