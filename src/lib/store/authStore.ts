import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, registerUser } from '@/lib/api/auth';

interface AuthState {
    user: any;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<string | null>;
    register: (
        name: string,
        username: string,
        email: string,
        password: string
    ) => Promise<string | null>;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            loading: false,
            error: null,
            isAuthenticated: false,
            login: async (email, password) => {
                set({ loading: true, error: null });
                try {
                    const { response, data } = await loginUser(email, password);
                    if (response.ok) {
                        set({
                            user: data.user,
                            token: data.token,
                            isAuthenticated: true,
                        });
                        return null;
                    } else {
                        const errorMsg = data.message || 'Login failed';
                        set({ error: errorMsg });
                        return errorMsg;
                    }
                } catch (err) {
                    set({ error: 'Network error' });
                    return 'Network error';
                } finally {
                    set({ loading: false });
                }
            },
            register: async (name, username, email, password) => {
                set({ loading: true, error: null });
                try {
                    const { response, data } = await registerUser(
                        name,
                        username,
                        email,
                        password
                    );
                    if (response.ok) {
                        set({
                            user: data.user,
                            token: data.token,
                            isAuthenticated: true,
                        });
                        return null;
                    } else {
                        const errorMsg = data.message || 'Registration failed';
                        set({ error: errorMsg });
                        return errorMsg;
                    }
                } catch (err) {
                    set({ error: 'Network error' });
                    return 'Network error';
                } finally {
                    set({ loading: false });
                }
            },
            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
            getStorage: () => localStorage,
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore;
