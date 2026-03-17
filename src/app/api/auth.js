import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.223.186:8000/api';

export async function login(username, password) {
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
        await AsyncStorage.setItem('authToken', data.token);
    }

    return data;
}

export async function register(username, email, password, accountType) {
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
        await AsyncStorage.setItem('authToken', data.token);
    }

    return data;
}

export async function getAuthToken() {
    return await AsyncStorage.getItem('authToken');
}

export async function logout() {
    await AsyncStorage.removeItem('authToken');
}

export async function getProfile() {
    const token = await AsyncStorage.getItem('authToken');
    
    if (!token) {
        throw new Error('Not authenticated');
    }

    const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
    }

    return data;
}