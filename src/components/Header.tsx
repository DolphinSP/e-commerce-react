'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useAuthStore from '@/lib/store/authStore';

const Header = () => {
    const router = useRouter();
    const { isAuthenticated, user, logout } = useAuthStore();

    const handleRedirect = (path: string) => {
        router.push(path);
    };

    return (
        <header className="bg-black bg-opacity-40 backdrop-blur-lg w-full py-4 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
                {!isAuthenticated ? (
                    <>
                        <Image
                            src="/logo.png"
                            alt="Ecommerce Logo"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <h1
                            className="text-2xl font-bold text-white cursor-pointer"
                            onClick={() => handleRedirect('/')}
                        >
                            ShopEase
                        </h1>
                    </>
                ) : (
                    <h1 className="text-2xl font-bold text-white">
                        Welcome, {user?.name}!
                    </h1>
                )}
            </div>
            <nav className="flex gap-6 items-center">
                <button
                    onClick={() => handleRedirect('/')}
                    className="hover:underline hover:underline-offset-4 transition text-white"
                >
                    Home
                </button>
                {!isAuthenticated ? (
                    <>
                        <button
                            onClick={() => handleRedirect('/login')}
                            className="hover:underline hover:underline-offset-4 transition text-white"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => handleRedirect('/register')}
                            className="hover:underline hover:underline-offset-4 transition text-white"
                        >
                            Register
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => handleRedirect('/dashboard')}
                            className="hover:underline hover:underline-offset-4 transition text-white"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={logout}
                            className="hover:underline hover:underline-offset-4 transition text-white"
                        >
                            Logout
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
