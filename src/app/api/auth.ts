const BASE_URL = 'http://192.168.11.186:8000/api';

let authToken: string | null = null;

export async function login(username: string, password: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
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
        console.log('token:', data.token);
        authToken = data.token;
    }

    return data;
}

export async function register(username: string, email: string, password: string, accountType: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/auth/register`, {
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
        console.log('token:', data.token);
        authToken = data.token;
    }

    return data;
}

export async function googleLogin(idToken: string, email: string, displayName: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken, email, displayName }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Google login failed');
    }

    if (data.token) {
        console.log('token:', data.token);
        authToken = data.token;
    }

    return data;
}

export async function getAuthToken(): Promise<string | null> {
    return authToken;
}

export async function logout(): Promise<void> {
    authToken = null;
}

export async function getProfile(): Promise<any> {
    if (!authToken) {
        throw new Error('Not authenticated');
    }

    const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
    }

    return data;
}
