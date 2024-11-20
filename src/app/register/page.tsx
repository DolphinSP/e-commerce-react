'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import useAuthStore from '@/lib/store/authStore';

const RegisterPage = () => {
    const router = useRouter();
    const { register, loading } = useAuthStore();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        const errorMsg = await register(
            formData.name,
            formData.username,
            formData.email,
            formData.password
        );
        if (errorMsg) {
            toast.error(errorMsg);
        } else {
            toast.success('Registration successful!');
            router.push('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-gray-800">
                    <h1 className="text-3xl font-bold mb-6">Register</h1>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleRegister}
                            className="w-full bg-blue-600 text-white py-3 rounded-full font-medium shadow-lg hover:bg-blue-700 transition"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </main>
        </div>
    );
};

export default RegisterPage;
