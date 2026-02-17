<template>
  <nav class="bg-white dark:bg-gray-800 shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" class="font-bold text-xl text-indigo-600 dark:text-indigo-400">TaskManager</NuxtLink>
          </div>
        </div>
        <div class="flex items-center">
          <template v-if="!userStore.isAuthenticated">
            <NuxtLink to="/login" class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</NuxtLink>
            <NuxtLink to="/register" class="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Sign up</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/tasks" class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tasks</NuxtLink>
            <NuxtLink to="/dashboard" class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-4">Dashboard</NuxtLink>
            <span class="text-gray-700 dark:text-gray-200 mr-4">Welcome, {{ userStore.user?.name }}</span>
            <button @click="toggleDarkMode" class="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <span v-if="isDark">☀️</span>
                <span v-else>🌙</span>
            </button>
            <button @click="logout" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const { logout } = useAuth()

const isDark = ref(false)

onMounted(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDark.value = true
        document.documentElement.classList.add('dark')
    } else {
        isDark.value = false
        document.documentElement.classList.remove('dark')
    }
})

const toggleDarkMode = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
    }
}
</script>
