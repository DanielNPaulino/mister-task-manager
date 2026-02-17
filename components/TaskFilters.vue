<template>
  <div class="flex flex-col space-y-4 mb-6">
    <!-- Status Filter -->
    <div class="flex flex-wrap gap-2">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300 self-center mr-2">Status:</span>
        <button 
        @click="$emit('update:status', 'all')"
        class="px-3 py-1 text-sm font-medium rounded-md transition-colors"
        :class="status === 'all' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'"
        >
        All
        </button>
        <button 
        @click="$emit('update:status', 'pending')"
        class="px-3 py-1 text-sm font-medium rounded-md transition-colors"
        :class="status === 'pending' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'"
        >
        Pending
        </button>
        <button 
        @click="$emit('update:status', 'completed')"
        class="px-3 py-1 text-sm font-medium rounded-md transition-colors"
        :class="status === 'completed' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'"
        >
        Completed
        </button>
    </div>

    <!-- Priority Filter -->
    <div class="flex flex-wrap gap-2">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300 self-center mr-2">Priority:</span>
        <button 
        @click="$emit('update:priority', 'all')"
        class="px-3 py-1 text-sm font-medium rounded-md transition-colors"
        :class="priority === 'all' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'"
        >
        All
        </button>
        <button 
        @click="$emit('update:priority', 'low')"
        class="px-3 py-1 text-sm font-medium rounded-md transition-colors"
        :class="priority === 'low' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'"
        >
        Low
        </button>
        <button 
        @click="$emit('update:priority', 'medium')"
        class="px-3 py-1 text-sm font-medium rounded-md transition-colors"
        :class="priority === 'medium' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'"
        >
        Medium
        </button>
        <button 
        @click="$emit('update:priority', 'high')"
        class="px-3 py-1 text-sm font-medium rounded-md transition-colors"
        :class="priority === 'high' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'"
        >
        High
        </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: string
  priority: string
}>()

defineEmits(['update:status', 'update:priority'])
</script>
