'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Home() {
    const router = useRouter()

    const handleRedirect = (path: string) => {
        router.push(path)
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            {/* Main Content */}
            <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
                <h1 className="text-5xl font-extrabold drop-shadow-lg">
                    Bienvenido al Proyecto Ecommerce
                </h1>
                <p className="mt-4 text-lg font-light max-w-xl">
                    Donde todos seremos millonarios como empresa. Descubre productos,
                    administra tu cuenta y crece con nosotros.
                </p>
                <div className="mt-8 flex gap-4">
                    <button
                        onClick={() => handleRedirect('/login')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => handleRedirect('/dashboard')}
                        className="bg-green-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-green-700 transition"
                    >
                        Dashboard
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-4 bg-black bg-opacity-50 backdrop-blur-lg text-center text-sm">
                <p>
                    © {new Date().getFullYear()} ShopEase. Todos los derechos reservados.
                </p>
            </footer>
        </div>
    )
}
