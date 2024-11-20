'use client';

import useAuthStore from '@/lib/store/authStore';
import useRequireAuth from '@/lib/hooks/useRequireAuth';

const DashboardPage = () => {
    const isAuthenticated = useRequireAuth();
    const { user, logout } = useAuthStore();

    if (!isAuthenticated) {
        return null; // Optionally, show a loading indicator
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg text-gray-800">
                    <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
                    <p className="text-gray-600 mt-2">Email: {user?.email}</p>
                    <button
                        onClick={logout}
                        className="mt-6 bg-red-600 text-white py-3 px-6 rounded-full font-medium shadow-lg hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
