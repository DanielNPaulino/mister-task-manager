export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()

    if (!userStore.isAuthenticated && to.path.startsWith('/tasks')) {
        return navigateTo('/login')
    }
})
