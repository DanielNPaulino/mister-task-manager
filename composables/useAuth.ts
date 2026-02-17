import { useUserStore } from '@/stores/user.store'

interface AuthResponse {
    token: string
    user: {
        id: number
        email: string
        name: string
    }
}

export const useAuth = () => {
    const userStore = useUserStore()
    const router = useRouter()

    const login = async (credentials: any) => {
        try {
            const { data, error } = await useFetch<AuthResponse>('/api/auth/login', {
                method: 'POST',
                body: credentials
            })

            if (error.value) {
                throw error.value
            }

            if (data.value) {
                const { token, user } = data.value
                userStore.setToken(token)
                userStore.setUser(user)

                // Helper to set cookie
                const tokenCookie = useCookie('auth_token')
                tokenCookie.value = token

                router.push('/tasks')
            }
        } catch (e) {
            console.error('Login failed', e)
            throw e
        }
    }

    const register = async (userData: any) => {
        try {
            const { data, error } = await useFetch<AuthResponse>('/api/auth/register', {
                method: 'POST',
                body: userData
            })

            if (error.value) {
                throw error.value
            }

            if (data.value) {
                const { token, user } = data.value
                userStore.setToken(token)
                userStore.setUser(user)

                const tokenCookie = useCookie('auth_token')
                tokenCookie.value = token

                router.push('/tasks')
            }
        } catch (e) {
            console.error('Registration failed', e)
            throw e
        }
    }

    const logout = () => {
        userStore.logout()
        router.push('/login')
    }

    return {
        login,
        register,
        logout
    }
}
