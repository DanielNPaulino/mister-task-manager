<template>
  <nav class="bg-white dark:bg-gray-800 shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" class="font-bold text-xl text-indigo-600 dark:text-indigo-400">TaskManager</NuxtLink>
          </div>
        </div>
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center">
          <template v-if="!userStore.isAuthenticated">
            <NuxtLink to="/login" class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</NuxtLink>
            <NuxtLink to="/register" class="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Sign up</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/tasks" class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tasks</NuxtLink>
            <NuxtLink to="/dashboard" class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-4">Dashboard</NuxtLink>
            <span class="text-gray-700 dark:text-gray-200 mr-4">Welcome, {{ userStore.user?.name }}</span>
            <button @click="toggleDarkMode" class="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
                <span v-if="isDark">☀️</span>
                <span v-else>🌙</span>
            </button>
            <button @click="logout" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
          </template>
        </div>
        
        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
            <button @click="toggleDarkMode" class="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
                <span v-if="isDark">☀️</span>
                <span v-else>🌙</span>
            </button>
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <!-- Icon when menu is closed -->
                <svg v-if="!isMobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <!-- Icon when menu is open -->
                <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMobileMenuOpen" class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <template v-if="!userStore.isAuthenticated">
          <NuxtLink to="/login" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">Login</NuxtLink>
          <NuxtLink to="/register" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">Sign up</NuxtLink>
        </template>
        <template v-else>
          <div class="px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-400">Signed in as {{ userStore.user?.name }}</div>
          <NuxtLink to="/tasks" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">Tasks</NuxtLink>
          <NuxtLink to="/dashboard" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">Dashboard</NuxtLink>
          <button @click="logout" class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">Logout</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const { logout } = useAuth()

const isDark = ref(false)
const isMobileMenuOpen = ref(false)

// Close mobile menu on route change
const router = useRouter()
router.afterEach(() => {
    isMobileMenuOpen.value = false
})

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
