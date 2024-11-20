import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/lib/store/authStore';

const useRequireAuth = () => {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    return isAuthenticated;
};

export default useRequireAuth;
