import { apiClient } from '@/lib/api/apiclient';

export const loginUser = (email: string, password: string) => {
    return apiClient('http://localhost:3006/api/users/login', {
        body: { email, password },
    });
};

export const registerUser = (
    name: string,
    username: string,
    email: string,
    password: string
) => {
    return apiClient('http://localhost:3006/api/users/register', {
        body: { name, username, email, password },
    });
};
