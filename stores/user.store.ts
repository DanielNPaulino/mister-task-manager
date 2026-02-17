import { defineStore } from 'pinia'

interface User {
    id: number
    email: string
    name: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        token: null as string | null
    }),
    actions: {
        setUser(user: User | null) {
            this.user = user
        },
        setToken(token: string | null) {
            this.token = token
        },
        logout() {
            this.user = null
            this.token = null
            const tokenCookie = useCookie('auth_token')
            tokenCookie.value = null
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token
    }
})
