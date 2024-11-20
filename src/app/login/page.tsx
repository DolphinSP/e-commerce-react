'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import useAuthStore from '@/lib/store/authStore';

const LoginPage = () => {
    const { login, loading } = useAuthStore();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const errorMsg = await login(email, password);
        if (errorMsg) {
            toast.error(errorMsg);
        } else {
            toast.success('Login successful!');
            router.push('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-gray-800">
                    <h1 className="text-3xl font-bold mb-6">Login</h1>
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleLogin}
                            className="w-full bg-blue-600 text-white py-3 rounded-full font-medium shadow-lg hover:bg-blue-700 transition"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
