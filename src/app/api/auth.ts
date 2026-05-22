import { api, setAuthToken, clearAuthToken } from './client';

const LOCAL_API = 'http://192.168.118.186:8000/api';

export async function login(username: string, password: string): Promise<any> {
    const response = await fetch(`${LOCAL_API}/auth/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }

    if (data.token) {
        setAuthToken(data.token);
    }

    return data;
}

export async function register(username: string, email: string, password: string, accountType: string): Promise<any> {
    const response = await fetch(`${LOCAL_API}/auth/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, accountType }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
    }

    if (data.token) {
        setAuthToken(data.token);
    }

    return data;
}

export async function googleLogin(idToken: string, email: string, displayName: string): Promise<any> {
    const data = await api('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify({ idToken, email, displayName }),
    });

    if (data.token) {
        setAuthToken(data.token);
    }

    return data;
}

export async function logout(): Promise<void> {
    clearAuthToken();
}

export async function getProfile(): Promise<any> {
    return api('/api/customer/profile');
}

export async function updateProfile(profileData: Record<string, any>): Promise<any> {
    return api('/api/customer/profile', {
        method: 'PATCH',
        body: JSON.stringify(profileData),
    });
}
