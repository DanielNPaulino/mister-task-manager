<template>
  <div class="bg-white shadow sm:rounded-lg p-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Task</h3>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input v-model="form.title" type="text" id="title" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Task title">
      </div>
      <div>
        <label for="priority" class="block text-sm font-medium text-gray-700">Priority</label>
        <select v-model="form.priority" id="priority" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea v-model="form.description" id="description" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Task description"></textarea>
      </div>
      <div class="flex justify-end">
        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save Task
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task.store'

const taskStore = useTaskStore()

const form = reactive({
    title: '',
    description: '',
    priority: 'medium'
})

const handleSubmit = async () => {
    if (!form.title) return
    
    await taskStore.addTask({
        title: form.title,
        description: form.description,
        priority: form.priority as 'low' | 'medium' | 'high',
        status: 'pending'
    })

    // Reset form
    form.title = ''
    form.description = ''
    form.priority = 'medium'
}
</script>
