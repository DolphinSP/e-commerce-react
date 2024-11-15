import { create } from 'zustand'

interface User {
    id: string
    name: string
    email: string
    token?: string
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    loading: boolean
    error: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true, error: null })
        try {
            const user: User = { id: '1', name: 'John Doe', email, token: 'abc123' }
            set({ user, isAuthenticated: true, loading: false })
        } catch (err) {
            set({ error: 'Login failed', loading: false })
        }
    },

    logout: () => set({ user: null, isAuthenticated: false }),
}))

export default useAuthStore
